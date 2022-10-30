from tech_news.database import search_news, find_news


# Requisito 10
# https://www.mongodb.com/docs/v4.2/reference/operator/meta/orderby/
def top_5_news():
    news_db = search_news({
        '$query': {},
        '$orderby': {'comments_count': -1},
        })
    top_five_news = []
    i = 0
    while i < 5 and i < len(news_db):
        new = (news_db[i]['title'], news_db[i]['url'])
        top_five_news.append(new)
        i += 1
    return top_five_news


# Referencias para conseguir concluir a ordenação no requisito 11
# ----------------------------------------------------------------
# Ajuda do Felps na mentoria.
# ----------------------------------------------------------------
# Inspiração para resolução curta no código do colega de turma
# link do pr: https://github.com/tryber/sd-016-b-tech-news/pull/18/
# commits/65dd653b2ce38c572b418613c77377e810fb676c
# -----------------------------------------------------------------
# fontes que me serviram como inspiração:
# https://www.adamsmith.haus/python/answers/how-to-sort-by-two-keys-in-python
# https://siddharth1.medium.com/1-understanding-operator-itemgetter-attribute-or-operator-itemgetter-attribute-27e61754d1fa
# https://stackoverflow.com/questions/4233476/sort-a-list-by-multiple-attributes

def generate_category_dict_couter(news_db):
    categories_dict = dict()
    for new in news_db:
        category = new['category']
        if category in categories_dict:
            categories_dict[category] += 1
        else:
            categories_dict[category] = 1
    return categories_dict


def sort_dict(c_dict):
    sorted_list = sorted(c_dict, key=lambda x: (-c_dict[x], x))
    return sorted_list


def top_5_categories():
    news_db = find_news()
    categories_dict = generate_category_dict_couter(news_db)
    ordered_categories = sort_dict(categories_dict)
    return ordered_categories[:5]
