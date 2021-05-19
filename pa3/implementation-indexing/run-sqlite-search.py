import sqlite3

import processor

DB_LOCATION = 'inverted-index.db'

connection = sqlite3.connect(DB_LOCATION)
cursor = connection.cursor()


def find_word(word: str) -> list:
    sql = 'SELECT * FROM Posting where word = ? ORDER BY frequency DESC'
    cursor.execute(sql, (word,))
    return cursor.fetchall()


def main(words_: list):
    results = {}
    for word in words_:
        docs = find_word(word)
        for doc in docs:
            indexes = list(map(int, doc[3].split(";")))[:5]
            file_name = doc[1]

            if file_name not in results:
                results[file_name] = [0, []]

            results[file_name][0] += doc[2]

            html_text = processor.get_html_text('PA3-data\\' + file_name)
            normalized_text = processor.normalize_text_upper(html_text)

            for index in indexes:
                text_before = normalized_text[max(index - 100, 0): index]
                org_word = normalized_text[index: index + len(word)]
                text_after = normalized_text[index + len(word) + 1: min(index + 100, len(normalized_text))]

                words_before = processor.tokenize_text(text_before)
                words_after = processor.tokenize_text(text_after)

                tmp = words_before[-3:]
                tmp.append(org_word)
                tmp.extend(words_after[:3])

                results[file_name][1].append(' '.join(tmp))

    return results


def print_results(search_query, results: dict):
    print(f'Results for a query: {search_query}\n\n')
    header = f'\t{"Frequencies":<15}{"Document":<45}{"Snippet":<150}'
    print(header)
    print('\t' + '-' * len(header))
    for page, result in sorted(results.items(), key=lambda x: x[1][0], reverse=True):
        print(f'\t{result[0]:<15}{page:<45}{" ... ".join(result[1])}')


if __name__ == '__main__':
    query = "Sistem SPOT"
    # query = sys.argv[1]
    words = processor.tokenize_text(processor.normalize_text(query))
    words = processor.remove_stop_words(words)
    print_results(query, main(words))
