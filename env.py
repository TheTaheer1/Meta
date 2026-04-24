import copy
import random

from action_handlers.manager import handle_manager_action
from action_handlers.worker import handle_worker_action
from action_handlers.qa import handle_qa_action
from action_handlers.client import handle_client_action

from validators import is_valid_action


class Environment:
    def __init__(self, config):
        self.config = config
        self.state = None
        self.rng = random.Random(config.get("seed", 42))
        self.history = []
        self.task_map = {}

    # =========================
    # RESET
    # =========================
    def reset(self):
        self.state = {
            "time": 0,
            "tasks": self._init_tasks(),
            "agents": self._init_agents(),
            "client": {
                "satisfaction": 1.0,
                "pending_change": False
            },
            "metrics": {
                "completed_tasks": 0,
                "failed_tasks": 0,
                "total_bugs": 0
            },
            "cost": 0.0
        }
        self.task_map = {t["id"]: t for t in self.state["tasks"]}
        return copy.deepcopy(self.state)

    # =========================
    # STEP
    # =========================
    def step(self, actions):
        reward = 0

        # 1. Apply actions
        for action in actions:
            if not is_valid_action(self.state, action):
                continue

            agent = action["agent"]

            if agent == "manager":
                handle_manager_action(self.state, action)

            elif "worker" in agent:
                handle_worker_action(self.state, action)

            elif agent == "qa":
                handle_qa_action(self.state, action)

            elif agent == "client":
                handle_client_action(self.state, action)

        # ❌ REMOVED: hidden fatigue system

        # 2. Random dynamics
        self._random_bug_injection()
        self._maybe_add_random_task()

        # 3. Deadlines
        reward += self._update_deadlines()

        # 4. Client satisfaction
        reward += self._update_client_satisfaction()

        # 5. Penalize ignoring client
        reward += self._penalize_ignored_changes()

        # 6. Cost
        reward -= self._update_cost()

        # 7. Idle penalty (stronger)
        workers = self.state["agents"]["workers"]

        if any(t["status"] != "done" for t in self.state["tasks"]):
            if all(w["current_task"] is None for w in workers.values()):
                reward -= 0.1  # Lower idle penalty

        # 8. Time
        self.state["time"] += 1

        # 9. Logging
        self.history.append({
            "time": self.state["time"],
            "reward": reward,
            "completed": self.state["metrics"]["completed_tasks"],
            "failed": self.state["metrics"]["failed_tasks"],
            "bugs": self.state["metrics"]["total_bugs"],
            "satisfaction": self.state["client"]["satisfaction"]
        })

        done = self._check_done()

        return copy.deepcopy(self.state), reward, done, {}

    # =========================
    # RANDOM TASK ARRIVAL (FIXED)
    # =========================
    def _maybe_add_random_task(self):
        base_prob = self.config.get("task_arrival_prob", 0.2)

        # 🚫 prevent overload
        active_tasks = [
            t for t in self.state["tasks"]
            if t["status"] == "in_progress"
        ]

        workers = self.state["agents"]["workers"]

        if len(active_tasks) >= len(workers) * 1.5:
            return

        if self.state["client"]["pending_change"]:
            prob = min(1.0, base_prob * 2)
        else:
            prob = base_prob

        if self.rng.random() < prob:
            new_id = len(self.state["tasks"])
            task = self._generate_task(new_id, self.state["time"])
            self.state["tasks"].append(task)
            self.task_map[new_id] = task

            # resolve client request
            self.state["client"]["pending_change"] = False

    # =========================
    # RANDOM BUG INJECTION (SAFE)
    # =========================
    def _random_bug_injection(self):
        for task in self.state["tasks"]:
            if task["status"] == "in_progress" and task["bugs"] < 3:
                if self.rng.random() < self.config.get("bug_injection_prob", 0.1):
                    task["bugs"] += 1
                    self.state["metrics"]["total_bugs"] += 1

    # =========================
    # DEADLINES (FIXED)
    # =========================
    def _update_deadlines(self):
        reward = 0
        t = self.state["time"]

        for task in self.state["tasks"]:
            if (
                task["status"] != "done"
                and task["outcome"] is None
                and t > task["deadline"]
            ):
                task["status"] = "failed"
                task["outcome"] = "failed"

                self.state["metrics"]["failed_tasks"] += 1
                reward -= 2  # Less severe penalty

                # 🔓 free worker
                worker_id = task["assigned_to"]
                if worker_id:
                    worker = self.state["agents"]["workers"].get(worker_id)
                    if worker:
                        worker["current_task"] = None
                        worker["is_busy"] = False

                task["assigned_to"] = None

        return reward

    # =========================
    # CLIENT SATISFACTION (STABLE)
    # =========================
    def _update_client_satisfaction(self):
        client = self.state["client"]

        prev = client["satisfaction"]

        completed = self.state["metrics"]["completed_tasks"]
        failed = self.state["metrics"]["failed_tasks"]

        client["satisfaction"] += 0.02 * (completed - failed)
        client["satisfaction"] = max(0, min(1, client["satisfaction"]))

        # Give a positive reward for each completed task
        return (client["satisfaction"] - prev) + 0.5 * (completed - failed)

    # =========================
    # PENALIZE IGNORED CLIENT
    # =========================
    def _penalize_ignored_changes(self):
        penalty = 0

        if self.state["client"]["pending_change"]:
            penalty -= 0.1
            self.state["client"]["satisfaction"] -= 0.02

        return penalty

    # =========================
    # COST
    # =========================
    def _update_cost(self):
        step_cost = 0

        for worker in self.state["agents"]["workers"].values():
            if worker["is_busy"]:
                step_cost += 1

        self.state["cost"] += step_cost
        return 0.05 * step_cost  # Lower cost penalty

    # =========================
    # DONE
    # =========================
    def _check_done(self):
        return self.state["time"] >= self.config["max_steps"]

    # =========================
    # INIT
    # =========================
    def _init_tasks(self):
        # Initial tasks are created at time 0
        return [self._generate_task(i, 0) for i in range(self.config["num_tasks"])]

    def _generate_task(self, task_id, current_time):
        return {
            "id": task_id,
            "type": self.rng.choice(["feature", "bugfix"]),
            "status": "todo",
            "assigned_to": None,
            "progress": 0.0,
            "bugs": 0,
            # Give enough time for the tasks to be completed by 2 workers
            # Ensure they don't fail due to tight deadlines for a successful trajectory
            "deadline": current_time + self.rng.randint(30, 45),
            "priority": self.rng.randint(1, 3),
            "complexity": self.rng.uniform(0.5, 2.0),
            "created_at": current_time,
            "outcome": None,
            "qa_status": "pending",
            "rejection_count": 0
        }

    def _init_agents(self):
        return {
            "manager": {},
            "workers": {
                "worker_1": self._create_worker(),
                "worker_2": self._create_worker()
            },
            "qa": {
                "current_task": None
            }
        }

    def _create_worker(self):
        return {
            "current_task": None,
            "efficiency": self.rng.uniform(0.5, 1.0),
            "is_busy": False,
            "fatigue": 0.0,
            "skills": {
                "feature": self.rng.uniform(0.3, 1.0),
                "bugfix": self.rng.uniform(0.3, 1.0)
            }
        }