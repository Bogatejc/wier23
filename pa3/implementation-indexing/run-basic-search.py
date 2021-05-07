import sys
import os
import processor

FILES_LOCATION = 'PA3-data'


def find(query_words: str):
    for root, sub_folders, files in os.walk(FILES_LOCATION):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                html_text = processor.get_html_text(file_path)
                for query_word in query_words:
                    pass
                    # TODO similar to fill_db.py but for each query_word track in dictionary for each file info you need


if __name__ == '__main__':
    words = sys.argv[1]
    words = processor.tokenize_text(processor.normalize_text(words))
    words = processor.remove_stop_words(words)
    find(words)
