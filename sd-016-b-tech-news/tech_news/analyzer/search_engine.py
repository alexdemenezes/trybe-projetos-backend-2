from datetime import datetime
from tech_news.database import search_news


# Requisito 6
def search_by_title(title):
    # https://stackoverflow.com/questions/4976278/python-mongodb-regex-ignore-case
    news_db = search_news({'title': {"$regex": title, "$options": 'i'}})
    news = [(new['title'], new['url']) for new in news_db]
    return news


# Requisito 7
def search_by_date(date):
    try:
        # https://pt.stackoverflow.com/questions/330458/como-formatar-datas-em-python
        str_to_date = datetime.strptime(date, "%Y-%m-%d")
        converted_date_format = str_to_date.strftime("%d/%m/%Y")
        news_db = search_news({'timestamp': converted_date_format})
        news = [(new['title'], new['url']) for new in news_db]
        return news
    except ValueError:
        raise ValueError('Data inválida')


# Requisito 8
def search_by_tag(tag):
    news_db = search_news({'tags': {"$regex": tag, "$options": 'i'}})
    news = [(new['title'], new['url']) for new in news_db]
    return news


# Requisito 9
def search_by_category(category):
    news_db = search_news({'category': {"$regex": category, "$options": 'i'}})
    news = [(new['title'], new['url']) for new in news_db]
    return news
