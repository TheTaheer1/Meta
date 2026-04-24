def handle_client_action(state, action):
    if action["type"] != "add_change_request":
        return

    tasks = state["tasks"]
    workers = state["agents"]["workers"]
    metrics = state["metrics"]
    client = state["client"]

    # ====================================
    # 🔄 RESET STALE REQUEST
    # ====================================
    if client.get("pending_change"):
        if state["time"] - client.get("pending_since", state["time"]) > 3:
            client["pending_change"] = False

    # Throttle requests if too many failures or system is overloaded
    if metrics.get("failed_tasks", 0) > 2 * max(1, metrics.get("completed_tasks", 1)):
        return

    # ====================================
    # 🚫 LIMIT TOTAL TASKS
    # ====================================
    if len(tasks) >= 10:
        return

    # ====================================
    # 🚫 PREVENT SPAM
    # ====================================
    if client.get("pending_change", False):
        return

    # ====================================
    # 🚫 SOFT BACKLOG CONTROL
    # ====================================
    todo_tasks = [t for t in tasks if t["status"] == "todo"]
    if len(todo_tasks) >= len(workers):
        if state["time"] % 3 != 0:
            return

    # ====================================
    # 🚫 AVOID OVERLOAD
    # ====================================
    active_tasks = [
        t for t in tasks
        if t["status"] == "in_progress"
    ]

    if len(active_tasks) >= len(workers) * 1.5:
        return

    # ====================================
    # 🚫 TOO MANY FAILURES (ADAPTIVE)
    # ====================================
    failed = metrics.get("failed_tasks", 0)
    completed = metrics.get("completed_tasks", 0)

    if failed > 5:
        if completed < failed * 0.5:
            if state["time"] % 4 != 0:
                return

    # ====================================
    # ⏱️ RATE LIMIT
    # ====================================
    last_time = client.get("last_request_time", -10)
    if state["time"] - last_time < 2:
        return

    # ====================================
    # ✅ ALLOW CHANGE REQUEST
    # ====================================
    client["pending_change"] = True
    client["pending_since"] = state["time"]
    client["last_request_time"] = state["time"]