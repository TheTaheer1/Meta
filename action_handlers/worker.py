import random


def handle_worker_action(state, action):

    # ====================================
    # 🔋 REST / IDLE HANDLING
    # ====================================
    if action["type"] == "rest":
        worker = state["agents"]["workers"][action["agent"]]
        worker["fatigue"] = max(0.0, worker["fatigue"] - 0.2)
        return

    if action["type"] == "idle":
        worker = state["agents"]["workers"][action["agent"]]
        worker["fatigue"] = max(0.0, worker["fatigue"] - 0.05)
        return

    # ====================================
    # 🚫 IGNORE NON-WORK
    # ====================================
    if action["type"] != "work":
        return

    worker_id = action["agent"]
    task_id = action["params"]["task_id"]

    worker = state["agents"]["workers"].get(worker_id)
    task = next((t for t in state["tasks"] if t["id"] == task_id), None)

    if not worker or not task:
        return

    # ❌ skip if task no longer active
    if task["status"] != "in_progress":
        return

    # ❌ wrong assignment → slight fatigue
    if worker["current_task"] != task_id:
        worker["fatigue"] = min(1.0, worker["fatigue"] + 0.02)
        return

    skill = worker["skills"][task["type"]]
    fatigue = worker["fatigue"]
    efficiency = worker["efficiency"]
    complexity = task["complexity"]
    rejections = task["rejection_count"]
    bugs = task["bugs"]

    effective_efficiency = efficiency * (1 - fatigue)

    # ====================================
    # 🛠️ BUG FIXING + PARTIAL PROGRESS
    if bugs > 0:
        fix_power = skill * (1 - fatigue)
        # Allow more bugs to be fixed at once
        bugs_fixed = max(1, int(fix_power * 3))
        task["bugs"] = max(0, task["bugs"] - bugs_fixed)

        # Progress even if bugs remain
        task["progress"] = min(
            1.0,
            task["progress"] + 0.01 * fix_power
        )

        worker["fatigue"] = min(1.0, worker["fatigue"] + 0.01)

    else:
        # ====================================
        # 🚀 NORMAL WORK MODE
        # ====================================
        time_left = task["deadline"] - state["time"]
        urgency_multiplier = 1 + max(0, (3 - time_left)) * 0.1

        base_progress = (
            effective_efficiency
            * skill
            * (0.3 + 0.7 * (1 - task["progress"]))
        ) / (complexity + 0.5)

        bug_penalty = 1 / (1 + bugs * 0.3)
        rework_penalty = 1 / (1 + rejections * 0.2)

        progress_gain = base_progress * urgency_multiplier * bug_penalty * rework_penalty

        if progress_gain < 0.01:
            progress_gain *= 0.5

        task["progress"] = min(1.0, task["progress"] + progress_gain)

        # 🔥 fatigue from work
        worker["fatigue"] = min(1.0, worker["fatigue"] + 0.02)

        # 🔄 refresh fatigue before bug calc
        fatigue = worker["fatigue"]

        # ====================================
        # 🐞 BUG GENERATION
        # ====================================
        base_bug = (1 - skill) * 0.4
        fatigue_impact = 0.1 * fatigue
        rejection_impact = 0.03 * rejections

        bug_chance = min(0.5, max(0.02, base_bug + fatigue_impact + rejection_impact))

        if random.random() < bug_chance:
            new_bugs = 1 if random.random() < 0.85 else 2
            task["bugs"] += new_bugs
            state["metrics"]["total_bugs"] += new_bugs

    # 🔄 refresh fatigue before learning
    fatigue = worker["fatigue"]

    # ====================================
    # 📈 SKILL LEARNING
    # ====================================
    worker["skills"][task["type"]] = min(
        1.0,
        worker["skills"][task["type"]] + 0.005 * (1 - fatigue)
    )

    # ====================================
    # 🔥 FORCE COMPLETION
    # ====================================
    if task["progress"] >= 0.9 and task["bugs"] == 0:
        task["progress"] = 1.0

    # ====================================
    # ✅ DONE → REVIEW
    # ====================================
    if task["progress"] >= 1.0:
        task["status"] = "in_review"
        task["qa_status"] = "pending"

        worker["current_task"] = None
        worker["is_busy"] = False

    # ====================================
    # 🔒 FINAL SAFETY CLAMP
    # ====================================
    worker["fatigue"] = min(1.0, max(0.0, worker["fatigue"]))