import nltk
import re
from stopwords import stop_words_slovene
from bs4 import BeautifulSoup


def normalize_text(text: str) -> str:
    normalized = text.strip()
    normalized = re.sub('[,!?.;]', ' ', normalized)
    normalized = re.sub('\s+', ' ', normalized)
    normalized = re.sub('\+', '\\+', normalized)
    return normalized.lower()


def normalize_text_upper(text: str) -> str:
    normalized = text.strip()
    normalized = re.sub('\s+', ' ', normalized)
    # normalized = re.sub('\+', '\\+', normalized)
    return normalized


tokenize_text = lambda text: nltk.tokenize.word_tokenize(text)

remove_stop_words = lambda words: set(words).difference(stop_words_slovene)


def get_html_text(file: str) -> str:
    with open(file, 'rt', encoding='UTF-8') as html_file:
        soup = BeautifulSoup(html_file.read(), 'html.parser')

        for script in soup.select('script'):
            script.extract()

        for noscript in soup.select('noscript'):
            noscript.extract()

    return soup.get_text(separator=' ')
