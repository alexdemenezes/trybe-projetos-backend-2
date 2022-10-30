
def get_client_days_off(list_of_orders, client_name):
    set_of_different_days = set()
    set_of_client_days = set()
    for order in list_of_orders:
        set_of_different_days.add(order[2])
        if order[0] == client_name:
            set_of_client_days.add(order[2])
    return set_of_different_days - set_of_client_days
