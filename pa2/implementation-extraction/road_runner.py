import io
import re
from typing import List

from bs4 import BeautifulSoup

WINDOWS = 'windows-1252'
UTF = 'utf-8'

HTML_TAGS_REGEX = '<.+?>'
HTML_CLOSING_TAGS_REGEX = '((<\\/)\\w+(>))'
HTML_OPENING_TAGS_REGEX = '<[^\\/^>]+>'
HTML_SELF_CLOSING_REGEX = '<\\s*([^\\s>]+)([^>]*)\\/\\s*>'
HTML_TAG_CLASS_REGEX = 'class=".+"'


class Tag(object):

    def __new__(cls, tag_start, tag_end, text, opt=False):
        if text is None:
            return super(Tag, cls).__new__(cls)

        if tag_start is not None:
            instance = super(Tag, cls).__new__(cls)
            instance.name = extract_tag_name(tag_start).upper()
            instance.indent = 0
            instance.quantity = ''
            instance.start = tag_start.regs[0][1]
            instance.word = ''
            instance.placeholder = ''
            instance.optional = opt
            instance.prefix = ''
            instance.suffix = ''

            if tag_end is not None:
                instance.end = tag_end.regs[0][0]
                tmp = text[instance.start:instance.end].strip()
                if not tmp.isspace() and tmp != '':
                    instance.word = tmp
            else:
                instance.end = None

            return instance

        return None

    def __eq__(self, other):
        return self.name == other.name

    def __is_closing__(self, other):
        closing_tag_front = other.name[0] + '/' + other.name[1:]
        closing_tag_back = other.name[:-1] + '/' + other.name[-1]

        return self.name == closing_tag_back or self.name == closing_tag_front


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

    for svg in html_content('svg'):
        svg.extract()

    for figure in html_content('figure'):
        figure.extract()

    for br in html_content.findAll('br'):
        br.extract()

    # for picture in html_content.select('picture'):
    #     picture.extract()

    # for source in html_content.select('source'):
    #     source.extract()

    # for video in html_content.select('video'):
    #     video.extract()

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
    if tag is None:
        return None

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


def create_re(tags_list: List[Tag]):
    r_e = '<HTML>\n'
    for tag in tags_list:

        if tag.prefix != '':
            r_e += tag.indent * '\t' + tag.prefix + '\n'

        r_e += tag.indent * '\t' + tag.name + ' ' + tag.quantity + ' ' + ('optional' if tag.optional else '') + '\n'
        if not tag.placeholder.isspace() and tag.placeholder != '':
            r_e += tag.indent * '\t' + tag.placeholder + '\n'

        if tag.suffix != '':
            r_e += tag.indent * '\t' + tag.suffix + '\n'

    return r_e + '</HTML>'


def check_if_closing(tag_opening, tag_closing):
    tag_opening = tag_opening.upper()
    tag_closing = tag_closing.upper()

    closing_tag_front = tag_opening[0] + '/' + tag_opening[1:]
    closing_tag_back = tag_opening[:-1] + '/' + tag_opening[-1]

    return tag_closing == closing_tag_back or tag_closing == closing_tag_front


def find_previous_index(tag_name, tags_list: List[Tag]):
    tmp = list(map(lambda x: x.name, tags_list[::-1])).index(tag_name)
    return len(tags_list) - 1 - tmp, tmp


def find_previous_index_new(tag, idx, tags_list: List[Tag]):
    length = 0
    while idx >= 0:
        if tags_list[idx].name == tag.name and tags_list[idx].indent == tag.indent:
            return idx, length

        idx -= 1
        length += 1

    return idx, length


def check_if_match(tag_a: Tag, tag_b: Tag, idx_a, idx_b, tags_list_a, tags_list_b, tags_list: List[Tag], text_a,
                   text_b):
    matching = True

    update_list: List[Tag] = []

    if tag_a is not None and tag_b is not None:
        prev_index, length = find_previous_index(tag_a.name, tags_list)

        j = idx_a
        k = idx_b
        for i in range(prev_index, prev_index + length):

            tag_p = tags_list[i]
            tag_a = Tag(tags_list_a[j], tags_list_a[j + 1], text_a)
            tag_b = Tag(tags_list_b[k], tags_list_b[k + 1], text_b)

            if tag_p is None or tag_a is None or tag_b is None:
                matching = False
                break

            if tag_p.name == tag_a.name == tag_b.name and \
                    tag_p.placeholder == tag_a.word == tag_b.word:
                tag_a.placeholder = tag_a.word
                tag_a.indent = tag_p.indent
                update_list.append(tag_a)

            elif tag_p.name == tag_a.name == tag_b.name:
                tag_a.placeholder = '#TEXT'
                tag_a.indent = tag_p.indent
                update_list.append(tag_a)

            else:
                matching = False
                break

            j += 1
            k += 1

    elif tag_a is not None:
        prev_index, length = find_previous_index(tag_a.name, tags_list)

        j = idx_a
        for i in range(prev_index, prev_index + length):

            tag_p = tags_list[i]
            tag_a = Tag(tags_list_a[j], tags_list_a[j + 1], text_a)

            if tag_p.name == tag_a.name and \
                    tag_p.placeholder == tag_a.word:
                tag_a.placeholder = tag_a.word
                tag_a.indent = tag_p.indent
                update_list.append(tag_a)

            elif tag_p.name == tag_a.name:
                tag_a.placeholder = '#TEXT'
                tag_a.indent = tag_p.indent
                update_list.append(tag_a)

            else:
                matching = False
                break

            j += 1

    elif tag_b is not None:
        prev_index, length = find_previous_index(tag_b.name, tags_list)

        k = idx_b
        for i in range(prev_index, prev_index + length):

            tag_p = tags_list[i]
            tag_b = Tag(tags_list_b[k], tags_list_b[k + 1], text_b)

            if tag_p.name == tag_b.name and \
                    tag_p.placeholder == tag_b.word:
                tag_b.placeholder = tag_b.word
                tag_b.indent = tag_p.indent
                update_list.append(tag_b)

            elif tag_p.name == tag_b.name:
                tag_b.placeholder = '#TEXT'
                tag_b.indent = tag_p.indent
                update_list.append(tag_b)

            else:
                matching = False
                break

            k += 1

    if matching:
        for i in range(prev_index, prev_index + length):
            tags_list[i] = update_list[i - prev_index]
            idx_a += 1
            idx_b += 1

        tags_list[prev_index].prefix = '('
        tags_list[prev_index + length].suffix = ')*'

    return idx_a, idx_b, matching


def save_tag(tag: Tag, ind, tags):
    if re.match(HTML_OPENING_TAGS_REGEX, tag.name):
        ind += 1
        tag.indent = ind
        tags.append(tag)

    elif re.match(HTML_CLOSING_TAGS_REGEX, tag.name):
        tag.indent = ind
        tags.append(tag)
        ind -= 1

    elif re.match(HTML_SELF_CLOSING_REGEX, tag.name):

        if tags[-1].name == tag.name:
            tags[-1].quantity = 'multiple'
            if not tag.optional:
                tags[-1].optional = False
        else:
            ind += 1
            tag.indent = ind
            tags.append(tag)
            ind -= 1

    return ind


def road_runner(path_a, path_b, encoding=UTF, shouldPrint=False, file=None):
    """
    Runs the road runner algorithm and prints the result to stdout.
    :param path_a: Path to the first file
    :param path_b: Path to the second file
    :param encoding: Encoding that will be used for reading the file
    :param shouldPrint: Set to true if you want to print additional information. Default value is False.
    :param file: Output file
    :return: None.
    """

    gamma = 2.0

    # Remove new lines and comments
    file_a = io.open(path_a, mode='r', encoding=encoding).read().replace('\n', '')
    file_a = re.sub('(<!--.*?-->)', '', file_a, flags=re.DOTALL)

    file_b = io.open(path_b, mode='r', encoding=encoding).read().replace('\n', '')
    file_b = re.sub('(<!--.*?-->)', '', file_b, flags=re.DOTALL)

    html_a = BeautifulSoup(file_a, features='html.parser')
    html_b = BeautifulSoup(file_b, features='html.parser')

    clean_html(html_a)
    clean_html(html_b)

    body_a = html_a.find('body')
    body_b = html_b.find('body')

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

    if shouldPrint: print(f'{len(tags_a)} : {len(tags_b)} ({min(len(tags_a), len(tags_b)) * 100 / max(len(tags_a), len(tags_b)):.2f} %)')
    if shouldPrint: print('-----------------------------------------------------')

    while index_a < len(tags_a) and index_b < len(tags_b):

        tag_a = tags_a[index_a]
        tag_b = tags_b[index_b]

        tag_a_name = extract_tag_name(tag_a)
        tag_b_name = extract_tag_name(tag_b)

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

            if shouldPrint: print(
                f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5} * {opening_a_size:>4} {opening_b_size:>4}')
            counter_same += 1

        # SELF-CLOSING and SELF-CLOSING
        elif re.match(HTML_SELF_CLOSING_REGEX, tag_a_name) and re.match(HTML_SELF_CLOSING_REGEX, tag_b_name):
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')
            tags_b.insert(index_b, None)
            index_a += 1
            index_b += 1
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')
            tags_a.insert(index_a, None)

        # SELF-CLOSING and OPENING
        elif re.match(HTML_SELF_CLOSING_REGEX, tag_a_name) and re.match(HTML_OPENING_TAGS_REGEX, tag_b_name):
            tags_b.insert(index_b, None)
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

        # OPENING and SELF-CLOSING
        elif re.match(HTML_OPENING_TAGS_REGEX, tag_a_name) and re.match(HTML_SELF_CLOSING_REGEX, tag_b_name):
            tags_a.insert(index_a, None)
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

        # SELF-CLOSING and CLOSING
        elif re.match(HTML_SELF_CLOSING_REGEX, tag_a_name) and re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
            tags_b.insert(index_b, None)
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

        # CLOSING and SELF-CLOSING
        elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name) and re.match(HTML_SELF_CLOSING_REGEX, tag_b_name):
            tags_a.insert(index_a, None)
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

        # OPENING and CLOSING
        elif re.match(HTML_OPENING_TAGS_REGEX, tag_a_name) and re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
            tags_b.insert(index_b, None)
            stack_a.append(tag_a)
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

        # CLOSING and OPENING
        elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name) and re.match(HTML_OPENING_TAGS_REGEX, tag_b_name):
            tags_a.insert(index_a, None)
            stack_b.append(tag_b)
            if shouldPrint: print(f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

        # CLOSING and CLOSING
        elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name) and re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
            if len(stack_a) > len(stack_b):
                start_tag_a = stack_a.pop()
                tags_b.insert(index_b, None)
                if shouldPrint: print(
                    f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

            else:
                start_tag_b = stack_b.pop()
                tags_a.insert(index_a, None)
                if shouldPrint: print(
                    f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

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

                    if shouldPrint: print(
                        f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

                    index_a += 1
                    index_b += 1

                    tag_a = tags_a[index_a]
                    tag_a_name = extract_tag_name(tag_a)

                    if re.match(HTML_OPENING_TAGS_REGEX, tag_a_name):
                        stack_a.append(tag_a_name)

                    elif re.match(HTML_CLOSING_TAGS_REGEX, tag_a_name):
                        stack_a.pop()

                tags_b.insert(index_b, None)
                if shouldPrint: print(
                    f'{f"({len(stack_a)})":<5} {tag_a_name:>10} : {"None":<10} {f"({len(stack_b)})":>5}')

                index_a += 1
                index_b += 1

            else:

                closing_depth = len(stack_b)
                closing_tag = '</' + tag_b_name[1:]

                stack_b.append(tag_b_name)
                while tag_b_name != closing_tag or len(stack_b) != closing_depth:
                    tags_a.insert(index_a, None)

                    if shouldPrint: print(
                        f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

                    index_a += 1
                    index_b += 1

                    tag_b = tags_b[index_b]
                    tag_b_name = extract_tag_name(tag_b)

                    if re.match(HTML_OPENING_TAGS_REGEX, tag_b_name):
                        stack_b.append(tag_b_name)

                    elif re.match(HTML_CLOSING_TAGS_REGEX, tag_b_name):
                        stack_b.pop()

                tags_a.insert(index_a, None)
                if shouldPrint: print(
                    f'{f"({len(stack_a)})":<5} {"None":>10} : {tag_b_name:<10} {f"({len(stack_b)})":>5}')

                index_a += 1
                index_b += 1

            continue

        else:
            if shouldPrint: print("ERROR: Tags don't match with any criterion.")

        index_a += 1
        index_b += 1

    if shouldPrint: print('\n-----------------------------------------------------')

    tags_a.append(None)
    tags_b.append(None)

    indentation = 0
    tags = []

    index_a = 0
    index_b = 0

    while index_a < len(tags_a) - 1 and index_b < len(tags_b) - 1:

        tag_a = Tag(tags_a[index_a], tags_a[index_a + 1], text_a)
        tag_b = Tag(tags_b[index_b], tags_b[index_b + 1], text_b)

        if tag_a is not None and tag_b is not None and tag_a.__eq__(tag_b):

            if tag_a.word == tag_b.word:
                tag_a.placeholder = tag_a.word
                tag_b.placeholder = tag_b.word
            else:
                tag_a.placeholder = '#TEXT'
                tag_b.placeholder = '#TEXT'

            indentation = save_tag(tag_a, indentation, tags)

        elif tag_a is not None:

            tag_a.placeholder = tag_a.word
            tag_a.optional = True

            indentation = save_tag(tag_a, indentation, tags)

        elif tag_b is not None:

            tag_b.placeholder = tag_b.word
            tag_b.optional = True

            indentation = save_tag(tag_b, indentation, tags)

        else:
            if shouldPrint: print('ERROR: Both tags are None.')

        index_a += 1
        index_b += 1

    index_tag = 0
    while index_tag < len(tags) - 1:

        if tags[index_tag].__is_closing__(tags[index_tag + 1]):
            prev_index, length = find_previous_index_new(tags[index_tag + 1], index_tag, tags)

            update_list: List = [None] * 2 * (length + 1)
            matching = True

            for i in range(prev_index, prev_index + length + 1):
                tag_p: Tag = tags[i]
                tag_a: Tag = tags[i + length + 1]

                tag_new = Tag(None, None, None)
                tag_new.indent = tag_p.indent
                tag_new.quantity = tag_p.quantity
                tag_new.name = tag_p.name
                tag_new.prefix = ''
                tag_new.suffix = ''
                tag_new.optional = tag_p.optional

                if tag_p.name == tag_a.name \
                        and tag_p.placeholder == tag_a.placeholder \
                        and tag_p.indent == tag_a.indent:
                    tag_new.placeholder = tag_p.placeholder
                    update_list[i - prev_index] = tag_new

                elif tag_p.name == tag_a.name \
                        and tag_p.indent == tag_a.indent:
                    tag_new.placeholder = '#TEXT'
                    update_list[i - prev_index] = tag_new

                else:
                    matching = False
                    break

            if matching:

                update_list[0].prefix = '('
                update_list[index_tag - prev_index].suffix = ')*'

                tmp = 0
                for i in range(prev_index, prev_index + 2 * (length + 1)):
                    if update_list[i - prev_index] is not None:
                        tags[i] = update_list[i - prev_index]
                    else:
                        del tags[i - tmp]
                        tmp += 1

            else:
                index_tag += 1
        else:
            index_tag += 1

    if file is not None:
        with open(file, 'w', encoding=encoding) as f:
            print(create_re(tags), file=f)
    else:
        print(create_re(tags))

    if shouldPrint: print('-----------------------------------------------------')

    if shouldPrint: print(f'{counter_same} : {len(tags_a)} ({counter_same * 100 / len(tags_a):.2f} %)')

    if shouldPrint: print('-----------------------------------------------------')


if __name__ == '__main__':
    # road_runner('../input-extraction/testA.html', '../input-extraction/testB.html', UTF, shouldPrint=True, file='output.txt')
    road_runner('../input-extraction/testA.html', '../input-extraction/testB.html', UTF, shouldPrint=True)
