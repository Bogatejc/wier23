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
    regex = r'<h1>(.*)</h1>\n<div class="subtitle">(.*)</div>[\s\S]*<p class="lead">(.*)</p>[\s\S]*<div class="author">[\s\S]*<div class="author-name">(.*)</div>[\s\S]*<div class="publish-meta">\n[\W]*(.*)<br/>[\s\S]*</figure>[\n]*<p(?:[\s\r]+[^>]*)?>(.*)</p>'

    for match in re.finditer(regex, html):

        result['author'] = match.group(4)
        result['publishedTime'] = match.group(5)
        result['title'] = match.group(1)
        result['subtitle'] = match.group(2)
        result['lead'] = match.group(3)
        # <[^>]*> tole odstrani še vse ostale html značke, ki so ostale v tekstu
        result['content'] = re.sub("<[^>]*>", "", match.group(6))

    # print(result)
    return json.dumps(result)

def extract_from_zurnal24(html):
    result = {
        "author": "",
        "publishedTime": "",
        "title": "",
        "viewCount": "",
        "lead": "",
        "content": ""
    }

    html = str(BeautifulSoup(html, 'html.parser'))
    # ([\n]*(<p(?:[\s\r]+[^>]*)?>(.*)</p>|<div(?:[\s\r]+[^>]*)?>[\n]*.*[\n]*</div>)*[\n]*)*[\s\S]*
    regex = r'<span class="article__views">[\n]*<i.*>.*</i>[\n]*<strong>(.*)</strong>[\s\S]*<h1 class="article__title">(.*)</h1>[\n]*<div class="article__authors">[\s\S]*<a href=.*>(.*)</a>[\n]*</div>[\n]*<time class="article__time">(.*)</time>[\s\S]*<div class="article__leadtext">[\n]*(.*)[\n]*</div>[\s\S]*<div class="article__content no_page_break cf" .*>\n([\s\S]*)</div>[\n]*<div class="text-center fold_article__bellow_content">'

    for match in re.finditer(regex, html):
        # print(match.group(0))
        viewCount = match.group(1) # view count
        title = match.group(2) # title
        author = match.group(3) # author
        publishedTime = match.group(4) # published time
        lead = match.group(5) # lead
        fullContent = match.group(6)
        content = re.sub("<[^>]*>|\n", "", fullContent)

    result['author'] = author
    result['publishedTime'] = publishedTime
    result['title'] = title
    result['viewCount'] = viewCount
    result['lead'] = lead
    result['content'] = content

    # print(result)
    # print()
    return json.dumps(result)

# if __name__ == '__main__':
#     html = ""
    # with io.open('../input-extraction/jewelry01.html', mode='r', encoding='windows-1252') as file:
    #     html = file.read()
    # extract_from_overstock(html)
    # with io.open('../input-extraction/Audi_A6_50_TDI_quattro_nemir_v_premijskem_razredu-RTVSLO.si.html', mode='r', encoding='utf-8') as file:
    #     html = file.read()
    # extract_from_rtvslo(html)
    # with io.open('../input-extraction/Volvo XC 40_D4_AWD_momentum_suvereno_med_najboljše_v_razredu-RTVSLO.si.html', mode='r', encoding='utf-8') as file:
    #     html = file.read()
    # extract_from_rtvslo(html)
    # with io.open('../input-extraction/polo.html', mode='r', encoding='utf-8') as file:
    #     htmlContent = file.read()
    # extract_from_zurnal24(htmlContent)
    # with io.open('../input-extraction/audi.html', mode='r', encoding='utf-8') as file:
    #     htmlContent = file.read()
    # extract_from_zurnal24(htmlContent)
