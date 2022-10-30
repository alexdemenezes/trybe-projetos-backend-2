from src.helpers.read_file import read
from src.helpers.write_file import write
from src.helpers.get_never_requested import get_never_requested
from src.helpers.get_client_days_off import get_client_days_off
from src.helpers.get_most_requested import get_most_requested
from src.helpers.get_ocurencies import get_ocurencies


def analyze_log(path_to_file):
    if not path_to_file.endswith(".csv"):
        raise FileNotFoundError(f"Extensão inválida: '{path_to_file}'")
    try:
        list_of_orders = read(path_to_file)
        maria_most_requested = get_most_requested(list_of_orders, "maria")
        arnaldo_hamburger_ocurencies = get_ocurencies(
            list_of_orders,
            "arnaldo",
            "hamburguer")
        never_requested_by_joao = get_never_requested(list_of_orders, "joao")
        days_off_joao = get_client_days_off(list_of_orders, "joao")
        data = [
            maria_most_requested,
            arnaldo_hamburger_ocurencies,
            never_requested_by_joao,
            days_off_joao
        ]
        write("data/mkt_campaign.txt", data)
    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo inexistente: {path_to_file}")
