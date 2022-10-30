
def get_never_requested(list_of_orders, client_name):
    set_of_different_orders = set()
    set_of_client_orders = set()
    for order in list_of_orders:
        set_of_different_orders.add(order[1])
        if order[0] == client_name:
            set_of_client_orders.add(order[1])
    return set_of_different_orders - set_of_client_orders
