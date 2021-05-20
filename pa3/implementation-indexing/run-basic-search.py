import sys
import os
import processor
import re

from time import time

FILES_LOCATION = 'PA3-data'


def find(query_words: str):
    time_query = 0
    start_time = time()
    results = {}
    for root, sub_folders, files in os.walk(FILES_LOCATION):
        for file_name in files:
            if file_name.endswith('.html'):
                file_path = os.path.join(root, file_name)
                html_text = processor.get_html_text(file_path)

                normalized_text = processor.normalize_text(html_text)
                normalized_text_upper = processor.normalize_text_upper(html_text)
                tokens = processor.tokenize_text(normalized_text)
                words_ = processor.remove_stop_words(tokens)

                for query_word in query_words:
                    # TODO similar to fill_db.py but for each query_word track in dictionary for each file info you need
                    if query_word in words_:
                        start_time_query = time()
                        indexes = [int(x.start()) for x in re.finditer(query_word, normalized_text)]
                        time_query += time() - start_time_query

                        if file_name not in results:
                            results[file_name] = [0, []]

                        results[file_name][0] += len(indexes)

                        for index in indexes:
                            # Create snippet
                            text_before = normalized_text_upper[max(index - 100, 0): index]
                            org_word = normalized_text_upper[index: index + len(query_word)]
                            text_after = normalized_text_upper[
                                         index + len(query_word) + 1: min(index + 100, len(normalized_text_upper))]

                            words_before = processor.tokenize_text(text_before)
                            words_after = processor.tokenize_text(text_after)

                            tmp = words_before[-3:]
                            tmp.append(org_word)
                            tmp.extend(words_after[:3])

                            results[file_name][1].append(' '.join(tmp))

    return results, time_query * 1000, time() - start_time


def print_results(search_query, results: dict, time_query, time_whole):
    print(f'Results for a query: {search_query}\n\n')
    print(f'\tResults found in {time_query:.0f} ms.')
    print(f'\tSnippets built in: {time_whole:.2f} s.\n\n')
    header = f'\t{"Frequencies":<15}{"Document":<45}{"Snippet":<150}'
    print(header)
    print('\t' + '-' * len(header))
    for page, result in sorted(results.items(), key=lambda x: x[1][0], reverse=True):
        print(f'\t{result[0]:<15}{page:<45}{" ... ".join(result[1])}')


if __name__ == '__main__':
    query = "Sistem SPOT"
    query = "predelovalne dejavnosti"

    if len(sys.argv) > 1:
        query = sys.argv[1]

    words = processor.tokenize_text(processor.normalize_text(query))
    words = processor.remove_stop_words(words)
    print_results(query, *find(words))
