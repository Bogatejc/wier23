import io
import re

from bs4 import BeautifulSoup

WINDOWS = 'windows-1252'
UTF = 'utf-8'

HTML_TAGS_REGEX = '<.+?>'
HTML_CLOSING_TAGS_REGEX = '((<\\/)\\w+(>))'
HTML_OPENING_TAGS_REGEX = '<[^\\/^>]+>'
HTML_SELF_CLOSING_REGEX = '<\\s*([^\\s>]+)([^>]*)\\/\\s*>'
HTML_TAG_CLASS_REGEX = 'class=".+"'


def clean_html(html_content):
    for script in html_content.select('script'):
        script.extract()

    for noscript in html_content.select('noscript'):
        noscript.extract()

    for link in html_content('link'):
        link.extract()

    for nav in html_content.select('nav'):
        nav.extract()

    for footer in html_content.select('footer'):
        footer.extract()

    for input_ in html_content('input'):
        input_.extract()

    for form in html_content('form'):
        form.extract()

    for style in html_content.select('style'):
        style.extract()

    for iframe in html_content.select('iframe'):
        iframe.extract()

    for button in html_content('button'):
        button.extract()

    # for svg in html_content('svg'):
    #     svg.extract()
    # 
    # for figure in html_content('figure'):
    #     figure.extract()

    for br in html_content.findAll('br'):
        br.extract()

    # for picture in html_content.select('picture'):
    #     picture.extract()
    # 
    # for source in html_content.select('source'):
    #     source.extract()

    # for video in html_content.select('video'):
    #     video.extract()
    # 
    # for ins in html_content.select('ins'):
    #     ins.extract()

    # for img in html_content.select('img'):
    #     img.extract()


def find_closest_equal_opening_tag(tag_name, idx, tags):
    score = 0
    depth = 0

    for i in range(idx, len(tags)):

        tmp = extract_tag_name(tags[i])

        if re.match(HTML_OPENING_TAGS_REGEX, tmp):
            depth += 1

        elif re.match(HTML_CLOSING_TAGS_REGEX, tmp):
            depth -= 1

        if tag_name == tmp and depth == 0:
            return score

        score += 1

    return score


def find_closest_equal_closing_tag(tag_name, idx, tags):
    score = 0
    depth = 0

    closing_tag_front = tag_name[0] + '/' + tag_name[1:]
    closing_tag_back = tag_name[:-1] + '/' + tag_name[-1]

    for i in range(idx, len(tags)):

        tmp = extract_tag_name(tags[i])

        if re.match(HTML_OPENING_TAGS_REGEX, tmp):
            depth += 1

        elif re.match(HTML_CLOSING_TAGS_REGEX, tmp):
            depth -= 1

        if (closing_tag_front == tmp or closing_tag_back == tmp) and depth == 0:
            return score

        score += 1

    return score


def count_same_tags(tag_name, idx_a, idx_b, tags_a_, tags_b_):
    score_a_ = 0
    score_b_ = 0

    closing_tag_front = tag_name[0] + '/' + tag_name[1:]
    closing_tag_back = tag_name[:-1] + '/' + tag_name[-1]

    tags_dict = {}

    depth = 0
    for i in range(idx_a, len(tags_a_)):

        tmp = extract_tag_name(tags_a_[i])

        if tmp not in tags_dict:
            tags_dict[tmp] = [0, 0]

        tags_dict[tmp][0] += 1

        if re.match(HTML_OPENING_TAGS_REGEX, tmp):
            depth += 1

        elif re.match(HTML_CLOSING_TAGS_REGEX, tmp):
            depth -= 1

        if (closing_tag_front == tmp or closing_tag_back == tmp) and depth == 0:
            break

        score_a_ += 1

    depth = 0
    for i in range(idx_b, len(tags_b_)):

        tmp = extract_tag_name(tags_b_[i])

        if tmp not in tags_dict:
            tags_dict[tmp] = [0, 1]

        tags_dict[tmp][1] += 1

        if re.match(HTML_OPENING_TAGS_REGEX, tmp):
            depth += 1

        elif re.match(HTML_CLOSING_TAGS_REGEX, tmp):
            depth -= 1

        if (closing_tag_front == tmp or closing_tag_back == tmp) and depth == 0:
            break

        score_b_ += 1

    count = 0
    for x in tags_dict.values():
        if x[0] != x[1]:
            count += abs(x[0] - x[1])

    return score_a_, score_b_, count


def extract_tag_name(tag):
    name = tag.group(0)
    split_ = name.split(' ')
    if len(split_) > 1:
        if name.endswith('\\>'):
            return split_[0] + '\\>'
        elif name.endswith('/>'):
            return split_[0] + '/>'
        else:
            return split_[0] + '>'

    return split_[0]


def extract_tag_first_class(tag):
    classes = re.findall(HTML_TAG_CLASS_REGEX, tag.group(0))
    if len(classes) > 0:
        return classes[0].split('"')[1].split(' ')[0]

    return ''


path_a = '../input-extraction/audi.html'
path_b = '../input-extraction/polo.html'
gamma = 2.0

# Remove new lines and comments
file_a = io.open(path_a, mode='r', encoding=UTF).read().replace('\n', '')
file_a = re.sub('(<!--.*?-->)', '', file_a, flags=re.DOTALL)

file_b = io.open(path_b, mode='r', encoding=UTF).read().replace('\n', '')
file_b = re.sub('(<!--.*?-->)', '', file_b, flags=re.DOTALL)

html_a = BeautifulSoup(file_a, features='html.parser')
html_b = BeautifulSoup(file_b, features='html.parser')

clean_html(html_a)
clean_html(html_b)

body_a = html_a.find('body')
body_b = html_b.find('body')

regular_expression = '<HTML>'

text_a = body_a.__str__()
text_b = body_b.__str__()

tags_a = list(re.finditer(HTML_TAGS_REGEX, text_a))
tags_b = list(re.finditer(HTML_TAGS_REGEX, text_b))

stack_a = []
stack_b = []

index_a = 0
index_b = 0

counter_same = 0
max_opening_size_diff = abs(len(tags_a) - len(tags_b)) * gamma

while index_a < len(tags_a) and index_b < len(tags_b):

    tag_a = tags_a[index_a]
    tag_b = tags_b[index_b]

    tag_a_name = extract_tag_name(tag_a)
    tag_b_name = extract_tag_name(tag_b)

    # print(f'{tag_a.group(0)} : {extract_tag_first_class(tag_a)}')
    # print(f'{tag_b.group(0)} : {extract_tag_first_class(tag_b)}')

    opening_a_size = 0
    opening_b_size = 0
    if re.match(HTML_OPENING_TAGS_REGEX, tag_a_name) and re.match(HTML_OPENING_TAGS_REGEX,
                                                                  tag_b_name) and tag_a_name == tag_b_name:
        opening_a_size, opening_b_size, _ = count_same_tags(tag_a_name, index_a, index_b, tags_a, tags_b)

    # Tags match
    if tag_a_name == tag_b_name and len(stack_a) == len(stack_b) and not \
            (re.match(HTML_OPENING_TAGS_REGEX, tag_a_name) and re.match(HTML_OPENING_TAGS_REGEX, tag_b_name) and
             abs(opening_a_size - opening_b_size) >= max_opening_size_diff):

        if re.match(HTML_OPENING_TAGS_REGEX, tag_a_name):
            stack_a.append(tag_a)
            stack_b.append(tag_b)

        elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name):
            start_tag_a = stack_a.pop()
            start_tag_b = stack_b.pop()

        print(
            f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5} * {opening_a_size:>4} {opening_b_size:>4}')
        counter_same += 1

        # print(text_a[start_tag_a.span()[1]: tag_a.span()[0]])
        # print(text_b[start_tag_b.span()[1]: tag_b.span()[0]])

    # SELF-CLOSING and SELF-CLOSING
    elif re.match(HTML_SELF_CLOSING_REGEX, tag_a_name) and re.match(HTML_SELF_CLOSING_REGEX, tag_b_name):
        print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

    # SELF-CLOSING and OPENING
    elif re.match(HTML_SELF_CLOSING_REGEX, tag_a_name) and re.match(HTML_OPENING_TAGS_REGEX, tag_b_name):
        tags_b.insert(index_b, None)
        print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

    # OPENING and SELF-CLOSING
    elif re.match(HTML_OPENING_TAGS_REGEX, tag_a_name) and re.match(HTML_SELF_CLOSING_REGEX, tag_b_name):
        tags_a.insert(index_a, None)
        print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

    # SELF-CLOSING and CLOSING
    elif re.match(HTML_SELF_CLOSING_REGEX, tag_a_name) and re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
        tags_b.insert(index_b, None)
        print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

    # CLOSING and SELF-CLOSING
    elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name) and re.match(HTML_SELF_CLOSING_REGEX, tag_b_name):
        tags_a.insert(index_a, None)
        print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

    # OPENING and CLOSING
    elif re.match(HTML_OPENING_TAGS_REGEX, tag_a_name) and re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
        tags_b.insert(index_b, None)
        stack_a.append(tag_a)
        print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

    # CLOSING and OPENING
    elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name) and re.match(HTML_OPENING_TAGS_REGEX, tag_b_name):
        tags_a.insert(index_a, None)
        stack_b.append(tag_b)
        print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

    # CLOSING and CLOSING
    elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name) and re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
        if len(stack_a) > len(stack_b):
            start_tag_a = stack_a.pop()
            tags_b.insert(index_b, None)
            print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

        else:
            start_tag_b = stack_b.pop()
            tags_a.insert(index_a, None)
            print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

    # OPENING and OPENING
    elif re.match(HTML_OPENING_TAGS_REGEX, tag_a_name) and re.match(HTML_OPENING_TAGS_REGEX, tag_b_name):

        # find closest equal opening tag
        # score_a = find_closest_equal_opening_tag(tag_a_name, index_b, tags_b)
        # score_b = find_closest_equal_opening_tag(tag_b_name, index_a, tags_a)

        # find closest equal closing tag
        score_a = find_closest_equal_closing_tag(tag_a_name, index_a, tags_a)
        score_b = find_closest_equal_closing_tag(tag_b_name, index_b, tags_b)

        if score_a < score_b:

            closing_depth = len(stack_a)
            closing_tag = '</' + tag_a_name[1:]

            stack_a.append(tag_a_name)
            while tag_a_name != closing_tag or len(stack_a) != closing_depth:
                tags_b.insert(index_b, None)

                print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

                index_a += 1
                index_b += 1

                tag_a = tags_a[index_a]
                tag_a_name = extract_tag_name(tag_a)

                if re.match(HTML_OPENING_TAGS_REGEX, tag_a_name):
                    stack_a.append(tag_a_name)

                elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name):
                    stack_a.pop()

            tags_b.insert(index_b, None)
            print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

            index_a += 1
            index_b += 1

        else:

            closing_depth = len(stack_b)
            closing_tag = '</' + tag_b_name[1:]

            stack_b.append(tag_b_name)
            while tag_b_name != closing_tag or len(stack_b) != closing_depth:
                tags_a.insert(index_a, None)

                print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

                index_a += 1
                index_b += 1

                tag_b = tags_b[index_b]
                tag_b_name = extract_tag_name(tag_b)

                if re.match(HTML_OPENING_TAGS_REGEX, tag_b_name):
                    stack_b.append(tag_b_name)

                elif re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
                    stack_b.pop()

            tags_a.insert(index_a, None)
            print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

            index_a += 1
            index_b += 1

        continue

    else:
        print("ERROR: Tags don't match with any criterion.")

    index_a += 1
    index_b += 1

# for tag_a, tag_b in zip(tags_a, tags_b):
# 
#     if tag_a is not None:
#         print(extract_tag_name(tag_a), end=' \t')
#     else:
#         print('None', end=' \t')
# 
#     if tag_b is not None:
#         print(extract_tag_name(tag_b), end=' \t')
#     else:
#         print('None', end=' \t')
# 
#     print()

print(f'{counter_same} : {len(tags_a)} ({counter_same * 100 / len(tags_a):.2f} %)')
print('DONE')
