import os
import re
import sqlite3

import processor

DB_LOCATION = 'inverted-index.db'
FILES_LOCATION = 'PA3-data'

connection = sqlite3.connect(DB_LOCATION)
cursor = connection.cursor()


def init_db():
    index_word = \
        '''
        CREATE TABLE IndexWord (
          word TEXT PRIMARY KEY
        );
        '''
    cursor.execute(index_word)

    posting = \
        '''
        CREATE TABLE Posting (
          word TEXT NOT NULL,
          documentName TEXT NOT NULL,
          frequency INTEGER NOT NULL,
          indexes TEXT NOT NULL,
          PRIMARY KEY(word, documentName),
          FOREIGN KEY (word) REFERENCES IndexWord(word)
        );
        '''
    cursor.execute(posting)
    connection.commit()


def process_htmls():
    word_exists = 'SELECT word FROM IndexWord WHERE word = ?'
    insert_word = 'INSERT INTO IndexWord(word) VALUES (?)'
    insert_page = 'INSERT INTO Posting(word, documentName, frequency, indexes) VALUES (?, ?, ?, ?)'

    for root, sub_folders, files in os.walk(FILES_LOCATION):
        for file in files:
            if file.endswith('.1.html'):
                file_path = os.path.join(root, file)
                html_text = processor.get_html_text(file_path)

                normalized_text = processor.normalize_text(html_text)
                tokens = processor.tokenize_text(normalized_text)
                words = processor.remove_stop_words(tokens)

                for word in words:
                    if re.match('\\w+', word):
                        indexes = [str(x.start()) for x in re.finditer(word, normalized_text)]

                        cursor.execute(word_exists, (word,))
                        exists = cursor.fetchall()

                        if not exists:
                            cursor.execute(insert_word, (word,))

                        cursor.execute(insert_page, (word, file, len(indexes), ';'.join(indexes)))

            connection.commit()


if __name__ == '__main__':
    try:
        init_db()
        process_htmls()
    except sqlite3.OperationalError:
        cursor.close()
        connection.close()
        os.remove(DB_LOCATION)
        connection = sqlite3.connect(DB_LOCATION)
        cursor = connection.cursor()
        init_db()
        process_htmls()



