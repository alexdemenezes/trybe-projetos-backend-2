import sys
from tech_news.scraper import get_tech_news
from tech_news.analyzer.search_engine import search_by_title, search_by_date
from tech_news.analyzer.search_engine import search_by_tag, search_by_category
from tech_news.analyzer.ratings import top_5_news, top_5_categories


# Requisito 12
def analyzer_menu():
    print(
        "Selecione uma das opções a seguir:\n"
        " 0 - Popular o banco com notícias;\n"
        " 1 - Buscar notícias por título;\n"
        " 2 - Buscar notícias por data;\n"
        " 3 - Buscar notícias por tag;\n"
        " 4 - Buscar notícias por categoria;\n"
        " 5 - Listar top 5 notícias;\n"
        " 6 - Listar top 5 categorias;\n"
        " 7 - Sair.")
    chosen_option = input()
    verify_option(chosen_option)


def verify_option(chosen_option):
    if (not chosen_option.isnumeric() or int(chosen_option) > 7):
        sys.stderr.write("Opção inválida\n")
    else:
        validate_chosen_option(int(chosen_option))


def validate_chosen_option(chosen_option):
    if chosen_option in range(0, 3):
        chosen_option_between_0_and_2(chosen_option)
    if chosen_option in range(3, 6):
        chosen_option_between_3_and_5(chosen_option)
    if chosen_option in range(6, 8):
        chosen_option_between_6_and_7(chosen_option)


def chosen_option_between_0_and_2(chosen_option):
    if chosen_option == 0:
        print("Digite quantas notícias serão buscadas:")
        amount = int(input())
        get_tech_news(amount)
    if chosen_option == 1:
        print("Digite o título:")
        title = input()
        print(search_by_title(title))
    if chosen_option == 2:
        print("Digite a data no formato aaaa-mm-dd:")
        date = input()
        print(search_by_date(date))


def chosen_option_between_3_and_5(chosen_option):
    if chosen_option == 3:
        print("Digite a tag:")
        tag = input()
        search_by_tag(tag)

    if chosen_option == 4:
        print("Digite a categoria:")
        category = input()
        print(search_by_category(category))
    if chosen_option == 5:
        print(top_5_news())


def chosen_option_between_6_and_7(chosen_option):
    if chosen_option == 6:
        print(top_5_categories())
    if chosen_option == 7:
        print("Encerrando script\n")


# def validate_chosen_option(chosen_option):
#     match chosen_option:
#         case '0':
#             print("Digite quantas notícias serão buscadas:")
#             # number = input()
#         case '1':
#             print("Digite o título:")
#             title = input()
#         case '2':
#             print("Digite a data no formato aaaa-mm-dd:")
#             data = input()
#         case '3':
#             print("Digite a tag:")
#             tag = input()
#         case '4':
#             print("Digite a categoria:")
#             category = input()
#         case '5':
#             pass
#         case '6':
#             pass
#         case '7':
#             print()
#             # answer = input()
#         case _:
#             sys.stderr.write("Opção inválida")


if __name__ == "__main__":
    analyzer_menu()
