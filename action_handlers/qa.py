def handle_qa_action(state, action):
    if action["type"] != "test":
        return

    task_id = action["params"]["task_id"]

    task = next((t for t in state["tasks"] if t["id"] == task_id), None)

    if not task or task["status"] != "in_review":
        return

    bugs = task["bugs"]
    rejections = task["rejection_count"]
    complexity = task["complexity"]

    allowed_bugs = 5 if complexity > 1.5 else 3

    # 🔥 even more forgiving tolerance
    # Always approve if bugs are not excessive
    if rejections >= 1:
        allowed_bugs += 2
    if rejections >= 3:
        allowed_bugs += 3

    worker_id = task["assigned_to"]

    # ====================================
    # ✅ APPROVED
    # ====================================
    if bugs <= allowed_bugs:
        task["qa_status"] = "approved"
        task["status"] = "done"
        task["outcome"] = "success"

        state["metrics"]["completed_tasks"] += 1

        # 🔥 clear assignment
        task["assigned_to"] = None

    # ====================================
    # ❌ REJECTED
    # ====================================
    else:
        task["qa_status"] = "rejected"
        task["rejection_count"] += 1

        # 🔥 FAIL TASK if too many rejections
        if task["rejection_count"] >= 4:
            task["status"] = "failed"
            task["outcome"] = "failure"

            state["metrics"]["failed_tasks"] += 1

            task["assigned_to"] = None
            task.pop("last_worker", None)
            return

        # 🔁 send back for fixing
        task["status"] = "in_progress"
        task["qa_status"] = "pending"

        task["assigned_to"] = None
        task.pop("last_worker", None)