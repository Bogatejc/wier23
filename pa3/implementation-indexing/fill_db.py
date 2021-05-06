import sqlite3
import os
import processor

DB_LOCATION = 'db'
FILES_LOCATION = 'PA3-data'

connection = sqlite3.connect(DB_LOCATION)
cursor = connection.cursor()


def init_db():
    index_word = '''
    CREATE TABLE IndexWord (
      word TEXT PRIMARY KEY
    );
    '''
    cursor.execute(index_word)
    posting = '''
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
    word_exist = 'SELECT word FROM IndexWord WHERE word = ?'
    insert_word = 'INSERT INTO IndexWord(word) VALUES (?)'
    insert_page = 'INSERT INTO Posting(word, documentName, frequency, indexes) VALUES (?, ?, ?, ?)'

    # TODO copied from stackoverflow
    for root, sub_folders, files in os.walk(FILES_LOCATION):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                html_text = processor.get_html_text(file_path)
                normalized_text = processor.normalize_text(html_text)
                tokens = processor.tokenize_text(normalized_text)
                words = processor.remove_stop_words(tokens)
                indexes = []
                for word in words:
                    # TODO find all positions of word in text and add to indexes
                    cursor.execute(word_exist, (word,))
                    w = cursor.fetchall()
                    if not w:
                        cursor.execute(insert_word, (word,))
                    cursor.execute(insert_page, (word, file, len(indexes), ';'.join(indexes)))
            connection.commit()


if __name__ == '__main__':
    init_db()
    process_htmls()
