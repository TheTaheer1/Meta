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

    # prioritize near-complete tasks
    if task["progress"] > 0.8:
        score += 3

    # overdue penalty
    if time_left < 0:
        score -= min(5, abs(time_left))

    # urgency boost
    if time_left <= 2:
        score += 3
    elif time_left <= 5:
        score += 1.5

    return score


def explain_decision(state, task, worker_id, score):
    worker = state["agents"]["workers"][worker_id]
    time_left = task["deadline"] - state["time"]

    return (
        f"Task {task['id']} → {worker_id}\n"
        f"  • skill: {worker['skills'][task['type']]:.2f}\n"
        f"  • priority: {task['priority']}\n"
        f"  • deadline in: {time_left}\n"
        f"  • fatigue: {worker['fatigue']:.2f}\n"
        f"  • score: {score:.2f}"
    )


def manager_act(state):
    actions = []

    tasks = state["tasks"]
    workers = state["agents"]["workers"]

    used_tasks = set()
    used_workers = set()

    # ====================================
    # ☠️ STEP -1: DROP HOPELESS TASKS (RELAXED)
    # ====================================
    for task in tasks:
        time_left = task["deadline"] - state["time"]
        # Only fail if extremely overdue and unfixable
        if task["status"] == "in_progress":
            if task["progress"] > 0.8:
                continue
            # Give up only if overdue by 20+ or 12+ bugs
            if time_left < -20 or task["bugs"] >= 12:
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

        if task["status"] == "in_progress":
            # protect near-complete tasks
            if task["progress"] > 0.8:
                continue

            if time_left < -5 or task["bugs"] >= 5:
                task["status"] = "failed"
                task["qa_status"] = "failed"
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
    # 🔄 RESET last_worker if bugs resolved
    # ====================================
    for task in tasks:
        if task.get("bugs", 0) == 0:
            task.pop("last_worker", None)

    # ====================================
    # 🔥 STEP 0: FINISH NEAR-COMPLETE TASKS
    # ====================================
    for task in tasks:
        if (
            task["status"] == "in_progress"
            and task["progress"] > 0.8
            and task["bugs"] == 0
        ):
            worker_id = task["assigned_to"]

            if worker_id:
                worker = workers.get(worker_id)

                if worker and worker["fatigue"] > 0.9:
                    continue

                used_workers.add(worker_id)
                used_tasks.add(task["id"])

                print("\n[MANAGER DECISION - LET WORKER FINISH]")
                print(explain_decision(state, task, worker_id, 999))

    # ====================================
    # 🔧 STEP 1: BUG FIX PRIORITY
    # ====================================
    for worker_id, worker in workers.items():
        if worker_id in used_workers:
            continue

        if worker["fatigue"] > 0.9:
            continue

        best_task = None
        best_score = float("-inf")

        for task in tasks:
            if task["status"] != "in_progress" or task["bugs"] == 0:
                continue

            time_left = task["deadline"] - state["time"]

            # skip near-dead tasks
            if time_left <= 1:
                continue

            # avoid bad reassignment
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

            best_task["last_worker"] = worker_id

            used_workers.add(worker_id)
            used_tasks.add(best_task["id"])

            print("\n[MANAGER DECISION - BUG FIX]")
            print(explain_decision(state, best_task, worker_id, best_score))

    # ====================================
    # 🚫 STEP 2: PREVENT OVERLOAD
    # ====================================
    active_tasks = [
        t for t in tasks
        if t["status"] == "in_progress"
        and (t["deadline"] - state["time"]) >= -2
    ]

    if len(active_tasks) >= len(workers) * 1.5:
        return actions

    # ====================================
    # 🟢 STEP 3: ASSIGN NEW TASKS
    # ====================================
    for worker_id, worker in workers.items():
        if worker_id in used_workers:
            continue

        if worker["is_busy"]:
            continue

        if worker["fatigue"] > 0.9:
            continue

        best_task = None
        best_score = float("-inf")

        for task in tasks:
            if task["status"] != "todo":
                continue

            time_left = task["deadline"] - state["time"]

            # skip near-dead tasks
            if time_left <= 1:
                continue

            if task["id"] in used_tasks:
                continue

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

            used_workers.add(worker_id)
            used_tasks.add(best_task["id"])

            print("\n[MANAGER DECISION]")
            print(explain_decision(state, best_task, worker_id, best_score))

    return actions


# ====================================
# 🔧 EXECUTION HANDLER (FIXED)
# ====================================
def handle_manager_action(state, action):
    typ = action["type"]

    if typ not in ["assign_task", "reassign_task"]:
        return

    task_id = action["params"]["task_id"]
    worker_id = action["params"].get("worker_id")

    task = next((t for t in state["tasks"] if t["id"] == task_id), None)
    worker = state["agents"]["workers"].get(worker_id)

    if not task or not worker:
        return

    # =========================
    # ASSIGN TASK
    # =========================
    if typ == "assign_task":
        if task["assigned_to"] is not None:
            return

        if worker["is_busy"]:
            return

        task["assigned_to"] = worker_id
        task["status"] = "in_progress"

        worker["current_task"] = task_id
        worker["is_busy"] = True

    # =========================
    # REASSIGN TASK (SAFE)
    # =========================
    elif typ == "reassign_task":

        # skip if same worker
        if task["assigned_to"] == worker_id:
            return

        # 🔥 validate BEFORE freeing old worker
        if worker["is_busy"]:
            return

        old_worker_id = task["assigned_to"]

        # now safely free old worker
        if old_worker_id:
            old_worker = state["agents"]["workers"].get(old_worker_id)
            if old_worker:
                old_worker["current_task"] = None
                old_worker["is_busy"] = False

        # assign new worker
        task["assigned_to"] = worker_id
        task["status"] = "in_progress"

        worker["current_task"] = task_id
        worker["is_busy"] = True