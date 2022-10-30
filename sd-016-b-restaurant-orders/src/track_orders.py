from src.helpers.get_most_requested import get_most_requested
from src.helpers.get_never_requested import get_never_requested
from src.helpers.get_client_days_off import get_client_days_off
from src.helpers.get_busiest_day import get_busiest_day
from src.helpers.get_least_busy_day import get_least_busy_day


class TrackOrders:
    def __init__(self):
        self.length = 0
        self.data = list()

    def __len__(self):
        return self.length

    def add_new_order(self, customer, order, day):
        self.length += 1
        self.data.append([customer, order, day])

    def get_most_ordered_dish_per_customer(self, customer):
        return get_most_requested(self.data, customer)

    def get_never_ordered_per_customer(self, customer):
        return get_never_requested(self.data, customer)

    def get_days_never_visited_per_customer(self, customer):
        return get_client_days_off(self.data, customer)

    def get_busiest_day(self):
        return get_busiest_day(self.data)

    def get_least_busy_day(self):
        return get_least_busy_day(self.data)
