import sys
import os
import processor
import re

from time import time

FILES_LOCATION = 'PA3-data'


def find(query_words: str):
    start_time = time()

    file_indexes_dict = {}
    # Search for indexes
    for root, sub_folders, files in os.walk(FILES_LOCATION):
        for file_name in files:
            if file_name.endswith('.html'):
                file_path = os.path.join(root, file_name)
                html_text = processor.get_html_text(file_path)

                normalized_text = processor.normalize_text(html_text)
                normalized_text_upper = processor.normalize_text_upper(html_text)
                tokens = processor.tokenize_text(normalized_text)
                words_ = processor.remove_stop_words(tokens)

                # Find indexes for query words
                for query_word in query_words:
                    if query_word in words_:
                        indexes = [int(x.start()) for x in re.finditer(query_word, normalized_text)]

                        if file_name not in file_indexes_dict:
                            file_indexes_dict[file_name] = [[], [], 0]

                        file_indexes_dict[file_name][0].append(indexes)
                        file_indexes_dict[file_name][1].append(normalized_text_upper)
                        file_indexes_dict[file_name][2] += len(indexes)

    # Create snippets
    results = {}
    for file_name, [word_indexes, normalized_texts, frequency] in sorted(file_indexes_dict.items(),
                                                                         key=lambda x: x[1][2], reverse=True)[:10]:
        if file_name not in results:
            results[file_name] = [frequency, []]

        done_words = set()
        for word_index, normalized_text_upper in zip(word_indexes, normalized_texts):
            current_word = None
            for index in word_index:
                # Create snippet
                text_before = normalized_text_upper[max(index - 100, 0): index]
                text_after = normalized_text_upper[index: min(index + 100, len(normalized_text_upper))]

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
