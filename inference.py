from env import Environment

from agents.manager_agent import manager_act
from agents.worker_agent import worker_act
from agents.qa_agent import qa_act
from agents.client_agent import client_act


config = {
    "num_tasks": 5,
    "max_steps": 30,
    "seed": 42,
    "task_arrival_prob": 0.2,
    "bug_injection_prob": 0.1
}

env = Environment(config)
state = env.reset()


def add_action(actions, action):
    if action and action.get("type") != "do_nothing":
        actions.append(action)


for step in range(config["max_steps"]):
    print(f"\n========== STEP {step} ==========")

    actions = []

    # Manager
    manager_actions = manager_act(state) or []
    if not isinstance(manager_actions, list):
        manager_actions = [manager_actions]
    actions.extend(manager_actions)

    # Workers
    actions.extend(worker_act(state))

    # QA + Client (filtered)
    add_action(actions, qa_act(state))
    add_action(actions, client_act(state))

    print("\n[ACTIONS]")
    for a in actions:
        print(a)

    # Step
    state, reward, done, _ = env.step(actions)

    # Summary
    print("\n[SUMMARY]")
    print(f"Time: {state['time']} | Reward: {reward:.2f} | Satisfaction: {state['client']['satisfaction']:.2f}")

    active = sum(1 for t in state["tasks"] if t["status"] == "in_progress")
    done_t = sum(1 for t in state["tasks"] if t["status"] == "done")
    failed = sum(1 for t in state["tasks"] if t["status"] == "failed")

    print(f"Active: {active} | Done: {done_t} | Failed: {failed}")

    # Tasks
    print("\n[Tasks]")
    for t in state["tasks"]:
        print(
            f"Task {t['id']} | {t['status']} | prog={t['progress']:.2f} | bugs={t['bugs']} | assigned={t['assigned_to']}"
        )

    # Early stop
    if all(t["status"] in ["done", "failed"] for t in state["tasks"]):
        print("\n=== ALL TASKS COMPLETED ===")
        break

    if done:
        print("\n=== SIMULATION COMPLETE ===")
        break


print("\n=== HISTORY (last 5 steps) ===")
for h in env.history[-5:]:
    print(h)