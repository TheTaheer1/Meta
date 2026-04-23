def compute_score(state, task, worker):
    skill = worker["skills"][task["type"]]
    fatigue = worker["fatigue"]
    time_left = task["deadline"] - state["time"]
    priority = task["priority"]
    bugs = task["bugs"]
    rejections = task["rejection_count"]

    score = 0

    score += 3 * skill

    if time_left <= 2:
        score += 3
    elif time_left <= 5:
        score += 1.5

    score += 1.5 * priority
    score -= 2 * fatigue
    score -= 0.5 * bugs
    score += 1.5 * rejections

    return score


def manager_act(state):
    best_action = None
    best_score = -1e9

    for task in state["tasks"]:
        if task["status"] not in ["todo", "in_progress"]:
            continue

        for worker_id, worker in state["agents"]["workers"].items():
            if worker["is_busy"]:
                continue

            score = compute_score(state, task, worker)

            if score > best_score:
                best_score = score
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