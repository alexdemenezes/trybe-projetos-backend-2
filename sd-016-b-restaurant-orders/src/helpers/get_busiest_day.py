from collections import Counter


def get_busiest_day(list_of_orders):
    return Counter([order[2] for order in list_of_orders]).most_common()[0][0]
