import random

def client_act(state):
    tasks = state["tasks"]
    workers = state["agents"]["workers"]
    metrics = state["metrics"]
    client = state["client"]

    # ====================================
    # 🚫 SKIP IF PENDING REQUEST
    # ====================================
    if client.get("pending_change"):
        return {
            "agent": "client",
            "type": "do_nothing",
            "params": {}
        }

    active_tasks = [t for t in tasks if t["status"] == "in_progress"]
    todo_tasks = [t for t in tasks if t["status"] == "todo"]

    failed = metrics.get("failed_tasks", 0)
    completed = metrics.get("completed_tasks", 0)

    # ====================================
    # 🎯 DYNAMIC PROBABILITY
    # ====================================
    prob = 0.2  # base

    # 🔽 reduce if overloaded
    if len(active_tasks) > len(workers):
        prob *= 0.5

    # 🔽 reduce if backlog exists
    if len(todo_tasks) >= len(workers):
        prob *= 0.5

    # 🔽 reduce if too many failures
    if failed > completed:
        prob *= 0.5

    # 🔼 increase if system is healthy
    if completed > failed:
        prob *= 1.5

    # 🔄 smoother adjustment (optional)
    load_ratio = len(active_tasks) / max(1, len(workers))
    prob *= max(0.5, 1 - 0.5 * load_ratio)

    # clamp probability
    prob = max(0.05, min(0.5, prob))

    # ====================================
    # 🎲 DECISION
    # ====================================
    if random.random() < prob:
        return {
            "agent": "client",
            "type": "add_change_request",
            "params": {}
        }

    return {
        "agent": "client",
        "type": "do_nothing",
        "params": {}
    }