def qa_act(state):
    review_tasks = [
        t for t in state["tasks"]
        if t["status"] == "in_review"
    ]

    if not review_tasks:
        return {"agent": "qa", "type": "do_nothing", "params": {}}

    # 🔥 smarter prioritization
    review_tasks.sort(
        key=lambda t: (
            -t["priority"],                  # high priority first
            (t["deadline"] - state["time"]), # urgent first
            -t["progress"],                  # almost done first
            t["bugs"],                       # fewer bugs first
            -t["rejection_count"]            # repeated failures still matter
        )
    )

    task = review_tasks[0]

    return {
        "agent": "qa",
        "type": "test",
        "params": {"task_id": task["id"]}
    }