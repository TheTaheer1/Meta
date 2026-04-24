# agents/worker_agent.py

def worker_act(state):
    actions = []

    workers = state["agents"]["workers"]

    for worker_id, worker in workers.items():

        fatigue = worker["fatigue"]
        task_id = worker["current_task"]

        # ====================================
        # 🔋 REST ONLY IF IDLE
        # ====================================
        if fatigue > 0.95 and task_id is None:
            actions.append({
                "agent": worker_id,
                "type": "rest",
                "params": {}
            })
            continue

        # ====================================
        # ⚠️ EXTREME FATIGUE SAFETY
        # ====================================
        if fatigue > 0.98 and task_id is not None:
            actions.append({
                "agent": worker_id,
                "type": "idle",
                "params": {}
            })
            continue

        # ====================================
        # 🚀 WORK IF ASSIGNED
        # ====================================
        if task_id is not None:
            actions.append({
                "agent": worker_id,
                "type": "work",
                "params": {
                    "task_id": task_id
                }
            })
        else:
            # ====================================
            # 🧘 IDLE → LIGHT RECOVERY
            # ====================================
            actions.append({
                "agent": worker_id,
                "type": "idle",
                "params": {}
            })

    return actions