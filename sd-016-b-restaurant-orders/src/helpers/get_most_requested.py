from collections import Counter


def get_most_requested(list_of_orders, client_name):
    return Counter(
        [order[1] for order in list_of_orders if order[0] == client_name]
        ).most_common()[0][0]
