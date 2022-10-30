import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    try:
        header = {"user-agent": "Fake user-agent"}
        time.sleep(1)
        response = requests.get(url, timeout=3, headers=header)
        response.raise_for_status()
    except (requests.HTTPError, requests.ReadTimeout):
        return None
    else:
        return response.text


# Requisito 2
def scrape_novidades(html_content):
    selector = Selector(html_content)
    links = []
    for new in selector.css('article.entry-preview'):
        link = new.css('a.cs-overlay-link::attr(href)').get()
        links.append(link)
    return links


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(html_content)
    next_page_link = selector.css('a.next::attr(href)').get()
    if next_page_link:
        return next_page_link
    else:
        return None


# Requisito 4
def scrape_noticia(html_content):
    new = {}
    selector = Selector(html_content)
    new['url'] = selector.css('link[rel="canonical"]::attr(href)').get()
    # https://www.w3schools.com/python/ref_string_strip.asp
    new['title'] = selector.css('h1.entry-title::text').get().strip()
    new['timestamp'] = selector.css('li.meta-date::text').get()
    new['writer'] = selector.css('a.url::text').get()
    new['comments_count'] = len(selector.css('ol.comment-list').getall()) or 0
    # https://developer.mozilla.org/pt-BR/docs/Web/CSS/:first-of-type
    # perguntar na mentoria pq o conteudo do texto vem quebrado em pedaços
    p1 = selector.css('.entry-content > p:first-of-type ::text').getall()
    # https://note.nkmk.me/en/python-string-concat/#:~:text=You%20can%20concatenate%20a%20list,the%20string%20method%2C%20join()%20.&text=Call%20the%20join()%20method,pass%20%5BList%20of%20strings%5D%20.&text=If%20you%20use%20an%20empty,makes%20a%20comma%2Ddelimited%20string.
    new['summary'] = ''.join(p1).strip()
    new['tags'] = selector.css('a[rel=tag]::text').getall() or []
    new['category'] = selector.css('a.category-style > span.label::text').get()
    return new


# Requisito 5
def get_tech_news(amount):
    next_page = 'https://blog.betrybe.com/'
    links = []
    news = []
    index = 0
    while len(links) < amount and next_page:
        html = fetch(next_page)
        links.extend(scrape_novidades(html))
        next_page = scrape_next_page_link(html)

    for link in links:
        if index < amount:
            html = fetch(link)
            news.append(scrape_noticia(html))
            index += 1
        else:
            break
    create_news(news)
    return news


if __name__ == '__main__':
    news = get_tech_news(13)
    print(len(news))
