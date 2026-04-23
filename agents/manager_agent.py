def compute_score(state, task, worker):
    skill = worker["skills"][task["type"]]
    fatigue = worker["fatigue"]
    time_left = task["deadline"] - state["time"]
    priority = task["priority"]
    bugs = task["bugs"]
    rejections = task["rejection_count"]
=======
    score = 3 * skill
    score += 1.5 * priority
    score -= 2 * fatigue
    score -= 0.5 * bugs
>>>>>>> 26589e5 (Push latest changes)

    if time_left <= 2:
        score += 3
    elif time_left <= 5:
=======
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

    used_tasks = set()  # 🔥 prevents duplicate assignment

    for worker_id, worker in workers.items():
        if worker["is_busy"]:
            continue

        best_task = None
        best_score = float("-inf")

        for task in tasks:
            if task["status"] != "todo":
                continue

            if task["id"] in used_tasks:
>>>>>>> 26589e5 (Push latest changes)
                continue

            score = compute_score(state, task, worker)

            if score > best_score:
                best_score = score
<<<<<<< HEAD
                best_action = {
                    "agent": "manager",
                    "type": "assign_task" if task["assigned_to"] is None else "reassign_task",
                    "params": {
                        "task_id": task["id"],
                        "worker_id": worker_id,
                        "new_worker_id": worker_id
                    }
                }

    if best_action:
        print(f"\n[MANAGER] score={best_score:.2f}")
        return best_action
    return {"agent": "manager", "type": "do_nothing", "params": {}}
=======
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

            used_tasks.add(best_task["id"])

            print("\n[MANAGER DECISION]")
            print(explain_decision(state, best_task, worker_id, best_score))

    return actions
>>>>>>> 26589e5 (Push latest changes)
