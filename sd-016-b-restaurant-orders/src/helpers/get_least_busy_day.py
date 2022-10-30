from collections import Counter


def get_least_busy_day(list_of_orders):
    return Counter([order[2] for order in list_of_orders]).most_common()[-1][0]
