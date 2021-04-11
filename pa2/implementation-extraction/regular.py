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
                intermediate_result['content'] = match.group(12)

            result.append(intermediate_result)

    return json.dumps(result)

def extract_from_rtvslo():
    result = {}

    return result

if __name__ == '__main__':
    html = ""
    with io.open('../input-extraction/jewelry01.html', mode='r', encoding='windows-1252') as file:
        html = file.read()
    extract_from_overstock(html)