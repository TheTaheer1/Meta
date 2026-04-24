# agents/manager_agent.py

def compute_score(state, task, worker):
    skill = worker["skills"][task["type"]]
    fatigue = worker["fatigue"]
    time_left = task["deadline"] - state["time"]
    priority = task["priority"]
    bugs = task["bugs"]
    rejections = task["rejection_count"]

    score = 3 * skill
    score += 1.5 * priority
    score -= 2 * fatigue
    score -= 0.5 * bugs
    score -= 1.0 * rejections

    # 🔥 prioritize near-complete
    if task["progress"] > 0.8:
        score += 3

    # overdue penalty
    if time_left < 0:
        score -= min(5, abs(time_left))

    # urgency
    if time_left <= 2:
        score += 3
    elif time_left <= 5:
        score += 1.5

    return score


def manager_act(state):
    actions = []

    tasks = state["tasks"]
    workers = state["agents"]["workers"]

    used_tasks = set()
    used_workers = set()

    # ====================================
    # ☠️ DROP HOPELESS TASKS (FIXED)
    # ====================================
    for task in tasks:
        time_left = task["deadline"] - state["time"]

        if task["status"] == "in_progress":
            # 🔥 protect near-complete tasks
            if task["progress"] > 0.8:
                continue

            # 🔥 relaxed failure condition
            if time_left < -5 or task["bugs"] >= 5:
                task["status"] = "failed"
                task["outcome"] = "failure"
                state["metrics"]["failed_tasks"] += 1

                worker_id = task["assigned_to"]
                if worker_id:
                    worker = workers.get(worker_id)
                    if worker:
                        worker["current_task"] = None
                        worker["is_busy"] = False

                task["assigned_to"] = None

    # ====================================
    # 🔥 FINISH NEAR-COMPLETE TASKS
    # ====================================
    for task in tasks:
        if (
            task["status"] == "in_progress"
            and task["progress"] > 0.8
            and task["bugs"] == 0
        ):
            worker_id = task["assigned_to"]
            if worker_id:
                used_workers.add(worker_id)
                used_tasks.add(task["id"])

    # ====================================
    # 🔧 BUG FIXING (SMART)
    # ====================================
    for worker_id, worker in workers.items():
        if worker_id in used_workers:
            continue

        if worker["fatigue"] > 0.85:
            continue

        if worker["is_busy"]:
            continue

        best_task = None
        best_score = float("-inf")

        for task in tasks:
            if task["status"] != "in_progress" or task["bugs"] == 0:
                continue

            if task["id"] in used_tasks:
                continue

            time_left = task["deadline"] - state["time"]

            # 🔥 do not skip near-dead tasks so they don't fail
            # if time_left <= 1:
            #     continue

            # 🔥 skill-aware reassignment
            current_worker_id = task["assigned_to"]
            if current_worker_id:
                current_worker = workers.get(current_worker_id)
                if current_worker:
                    if worker["skills"][task["type"]] <= current_worker["skills"][task["type"]]:
                        continue

            score = compute_score(state, task, worker)

            if score > best_score:
                best_score = score
                best_task = task

        if best_task:
            actions.append({
                "agent": "manager",
                "type": "reassign_task",
                "params": {
                    "task_id": best_task["id"],
                    "worker_id": worker_id
                }
            })

            used_workers.add(worker_id)
            used_tasks.add(best_task["id"])

    # ====================================
    # 🟢 ASSIGN NEW TASKS (NO DUPLICATES, ALWAYS BUSY)
    # ====================================
    assigned_tasks = {t["id"] for t in tasks if t["assigned_to"]}
    for worker_id, worker in workers.items():
        if worker_id in used_workers:
            continue
        if worker["is_busy"]:
            continue
        if worker["fatigue"] > 0.95:
            continue
        best_task = None
        best_score = float("-inf")
        for task in tasks:
            if task["status"] != "todo":
                continue
            if task["id"] in assigned_tasks:
                continue
            # do not skip near-dead tasks
            # if time_left <= 1:
            #     continue
            score = compute_score(state, task, worker)
            if score > best_score:
                best_score = score
                best_task = task
        if best_task:
            actions.append({
                "agent": "manager",
                "type": "assign_task",
                "params": {
                    "task_id": best_task["id"],
                    "worker_id": worker_id
                }
            })
            assigned_tasks.add(best_task["id"])
            used_tasks.add(best_task["id"])

    return actions
