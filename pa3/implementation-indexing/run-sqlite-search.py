import sqlite3
import sys
import processor

DB_LOCATION = 'db'

connection = sqlite3.connect(DB_LOCATION)
cursor = connection.cursor()


def find_word(word: str) -> list:
    sql = 'SELECT * FROM Posting where word = ? ORDER BY frequency DESC'
    cursor.execute(sql, (word,))
    return cursor.fetchall()


def main(words: list):
    for word in words:
        docs = find_word(word)
        for doc in docs:
            # indexes = list(map(int, doc[3].split(";")))[:5] # TODO uncomment when fill_db works
            name = doc[1]
            freq = doc[2]
            # TODO track if document with name was retrieved by previous word and sum frequencies
            # TODO build snippet around word (open html find word and build snippet)
            print(name, freq)


if __name__ == '__main__':
    query = sys.argv[1]
    words = processor.tokenize_text(processor.normalize_text(query))
    words = processor.remove_stop_words(words)
    main(words)
