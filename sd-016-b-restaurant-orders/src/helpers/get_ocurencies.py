from collections import Counter


def get_ocurencies(list_of_orders, client_name, filter):
    return Counter(
        [order[1] for order in list_of_orders if order[0] == client_name]
        )[filter]
