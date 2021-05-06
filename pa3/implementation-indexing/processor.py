import nltk
import re
from stopwords import stop_words_slovene
from bs4 import BeautifulSoup


# nltk.download('punkt')
# nltk.download('stopwords')


def normalize_text(text: str) -> str:
    normalized = text.strip()
    normalized = re.sub('\\s+', ' ', normalized)
    return normalized.lower()


tokenize_text = lambda text: nltk.tokenize.word_tokenize(text)

remove_stop_words = lambda words: set(words).difference(stop_words_slovene)


def get_html_text(file: str) -> str:
    with open(file, 'rt', encoding='UTF-8') as html_file:
        soup = BeautifulSoup(html_file.read(), 'html.parser')
        # TODO additional parsing maybe remove scripts...
    return soup.get_text()
