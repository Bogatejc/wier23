import io
import re
import json
from bs4 import BeautifulSoup

def extract_from_overstock(html):
    result = []
    html = str(BeautifulSoup(html, 'html.parser'))
    regex = r'<b>([0-9].+)<\/b>.*\n.*\n.*<b>(.+)</b>.*<s>([\$0-9,.]+)(.*\n.*<b>(.+)</b>.*<b>([\$0-9.]+))?(.*\n.*<b>(.+)</b>.*<span class=\"littleorange\">([\$0-9.,]+)\s.([0-9]+.))?(.*\n.*\n.*<span class=\"normal\">(.*\n?(.*)\n?(.*)\n?(.*))<br/><a)?'
    for match in re.finditer(regex, html):
        intermediate_result = {
            "title": "",
            "listPrice": "",
            "price": "",
            "saving": "",
            "savingPercent": "",
            "content": ""
        }
        if(len(match.groups()) == 15):
            intermediate_result['title'] = match.group(1)

            if(match.group(2) is not None and match.group(3) is not None):
                intermediate_result['listPrice'] = match.group(3)

            if(match.group(5) is not None and match.group(6) is not None):
                intermediate_result['price'] = match.group(6)

            if(match.group(8) is not None and match.group(9) is not None):
                intermediate_result['saving'] = match.group(9)

            if(match.group(8) is not None and match.group(10) is not None):
                intermediate_result['savingPercent'] = match.group(10)
            
            if(match.group(11) is not None and match.group(12) is not None):
                intermediate_result['content'] = match.group(12).replace("\n", " ")

            result.append(intermediate_result)

    # print(json.dumps(result))
    return json.dumps(result)

def extract_from_rtvslo(html):
    result = {
        "author": "",
        "publishedTime": "",
        "title": "",
        "subtitle": "",
        "lead": "",
        "content": ""
    }
    html = str(BeautifulSoup(html, 'html.parser'))
    regex = r'<h1>(.*)</h1>.*\n.*<div class=\"subtitle\">(.*)</div>((.*\n){19})<p class=\"lead\">(.*)</p>((.*\n){4})<div class=\"author-name\">(.*)</div>((.*\n){3})[\s]+(.*)<br/>[\s\S]+</div>(.*)'
    regex = r'<h1>(.*)</h1>.*\n.*<div class=\"subtitle\">(.*)</div>((.*\n){15})<p class=\"lead\">(.*)</p>((.*\n){4})<div class=\"author-name\">(.*)</div>((.*\n){3})[\s]+(.*)<br/>[\s\S]+</div>(.*)'
    # regex = r'<h1>(.*)<\/h1>[\s\S]+<div class=\"subtitle\">(.*)<\/div>[\s\S]+<p class=\"lead\">(.*)<\/p>[\s\S]+' \
    #                 r'<div class=\"author-name\">(.*)<\/div>[\s\S]+\"publish-meta\">[\n\W]+(.*)<br\/>[\s\S]+<\/div>[\n]*' \
    #                 r'<\/figure>[\n]*<p([\s\S]*.*)<div class=\"gallery\">'

    for match in re.finditer(regex, html):

        # result['author'] = match.group(8)
        # result['publishedTime'] = match.group(11)
        # result['title'] = match.group(1)
        # result['subtitle'] = match.group(2)
        # result['lead'] = match.group(5)
        # result['author'] = match.group(8)
        # print(match.group(0))
        print(match.group(1))
        print(match.group(2))
        # print(match.group(3))
        # print(match.group(4))
        print(match.group(5))
        # print(match.group(6))
        # print(match.group(7))
        print(match.group(8))
        # # print(match.group(9))
        # # print(match.group(10))
        # print(match.group(11))
        # print(match.group(12))
        # print(match.group(12))
        # print(match.group(5))
        # print(result)
        print()

    print(result)
    return json.dumps(result)

if __name__ == '__main__':
    html = ""
    with io.open('../input-extraction/jewelry01.html', mode='r', encoding='windows-1252') as file:
        html = file.read()
    extract_from_overstock(html)
    # with io.open('../input-extraction/Audi_A6_50_TDI_quattro_nemir_v_premijskem_razredu-RTVSLO.si.html', mode='r', encoding='utf-8') as file:
    # with io.open('../input-extraction/Volvo XC 40_D4_AWD_momentum_suvereno_med_najboljše_v_razredu-RTVSLO.si.html', mode='r', encoding='utf-8') as file:
    #     html = file.read()
    # extract_from_rtvslo(html)
