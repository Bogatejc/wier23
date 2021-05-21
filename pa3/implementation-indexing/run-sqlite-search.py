import sys
import sqlite3
import processor

from time import time

DB_LOCATION = 'inverted-index.db'
NUM_OF_RESULTS = 10

connection = sqlite3.connect(DB_LOCATION)
cursor = connection.cursor()


def find_word(words_: list) -> list:
    sql = f'''SELECT SUM(frequency) AS "frequencies", documentName, group_concat(indexes) FROM Posting
             WHERE {"or ".join(["word LIKE ?"] * len(words_))}
             GROUP BY documentName
             ORDER BY frequencies DESC
             LIMIT {NUM_OF_RESULTS}
             '''

    cursor.execute(sql, words_)
    return cursor.fetchall()


def find(words_: list):
    start_time = time()
    results = {}

    docs = find_word(list(words_))

    for doc in docs:
        file_name = doc[1]

        if file_name not in results:
            results[file_name] = [doc[0], []]

        html_text = processor.get_html_text('PA3-data\\' + file_name)
        normalized_text = processor.normalize_text_upper(html_text)

        done_words = set()
        word_indexes = doc[2].split(",")
        for word_index in word_indexes:
            current_word = None
            for index in list(map(int, word_index.split(";", 5)[:5])):
                # Create snippet
                text_before = normalized_text[max(index - 100, 0): index]
                text_after = normalized_text[index: min(index + 100, len(normalized_text))]

                words_before = processor.tokenize_text(text_before)[-3:]
                words_after = processor.tokenize_text(text_after)[:4]
                current_word = text_after[0]

                # Check for intersections between snippets
                should_continue = False
                for x in [y.lower() for y in words_before + words_after[1:]]:
                    if x in done_words:
                        should_continue = True
                        break

                if should_continue:
                    continue

                results[file_name][1].append(' '.join(words_before + words_after))

            done_words.add(current_word)

    return results, time() - start_time


def print_results(search_query, results: dict, time_whole):
    print(f'Results for a query: {search_query}\n\n')
    print(f'\tResults found in: {time_whole:.2f} s.\n\n')
    header = f'\t{"Frequencies":<15}{"Document":<45}{"Snippet":<150}'
    print(header)
    print('\t' + '-' * len(header))

    for page, result in results.items():
        print(f'\t{result[0]:<15}{page:<45}{" ... ".join(result[1])}')


if __name__ == '__main__':
    query = "predelovalne dejavnosti"
    # query = "trgovina"
    # query = "social services"
    # query = "Republika Slovenija"
    # query = "davek"
    # query = "vloge in obvestila"

    if len(sys.argv) > 1:
        query = sys.argv[1]

    words = processor.tokenize_text(processor.normalize_text(query))
    words = processor.remove_stop_words(words)
    print_results(query, *find(words))
