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

    # =========================
    # INTELLIGENT QA LOGIC
    # =========================
    allowed_bugs = 0

    # allow small tolerance for complex tasks
    if complexity > 1.5:
        allowed_bugs = 1

    # stricter after repeated failures
    if rejections >= 2:
        allowed_bugs = 0

    if bugs <= allowed_bugs:
        # ✅ APPROVE
        task["qa_status"] = "approved"
        task["status"] = "done"
        task["outcome"] = "success"

        state["metrics"]["completed_tasks"] += 1

    else:
        # ❌ REJECT
        task["qa_status"] = "rejected"
        task["status"] = "in_progress"
        task["rejection_count"] += 1

        # simulate partial bug fixing
        task["bugs"] = max(0, task["bugs"] - 1)