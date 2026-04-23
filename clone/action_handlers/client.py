def handle_client_action(state, action):
    typ = action["type"]

    if typ == "add_change_request":
        state["client"]["pending_change"] = True