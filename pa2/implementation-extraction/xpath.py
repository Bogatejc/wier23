import io
import re
import json
from lxml import html, etree

def extract_from_overstock(htmlContent):
    result = []
    treeContent = html.fromstring(htmlContent)

    cards = treeContent.xpath("//tbody/tr[(contains(@bgcolor, '#ffffff') or contains(@bgcolor, '#dddddd')) and count(td[@valign='top'])=2]")
    for card in cards:
        # print(etree.tostring(card, pretty_print=True))
        intermediate_result = {
            "title": "",
            "listPrice": "",
            "price": "",
            "saving": "",
            "savingPercent": "",
            "content": ""
        }

        intermediate_result['title'] = card.xpath("td[@valign='top']/a/b/text()")[0]
        intermediate_result['listPrice'] = card.xpath("td[@valign='top']/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/s/text()")[0]
        intermediate_result['price'] = card.xpath("td[@valign='top']/table/tbody/tr/td[1]/table/tbody/tr[2]/td[2]/span/b/text()")[0]
        intermediate_result['saving'] = card.xpath("substring-before(td[@valign='top']/table/tbody/tr/td[1]/table/tbody/tr[3]/td[2]/span/text(), ' (')")
        intermediate_result['savingPercent'] = card.xpath("substring-before(substring-after(td[@valign=\'top\']/table/tbody/tr/td[1]/table/tbody/tr[3]/td[2]/span/text(), '('), ')')")
        content_ = card.xpath("td[@valign='top']/table/tbody/tr/td[2]/span/text()")[0]
        intermediate_result['content'] = content_.replace("\n", " ")
        
        result.append(intermediate_result)

    # print()
    # print(result)
    return json.dumps(result)

def extract_from_rtvslo(htmlContent):
    result = {
        "author": "",
        "publishedTime": "",
        "title": "",
        "subtitle": "",
        "lead": "",
        "content": ""
    }
    treeContent = html.fromstring(htmlContent)
    title = treeContent.xpath('//*[@id="main-container"]/div[3]/div/header/h1/text()')[0]
    subtitle = treeContent.xpath('//*[@id="main-container"]/div[3]/div/header/div[2]/text()')[0]
    author = treeContent.xpath('//*[@id="main-container"]/div[3]/div/div[1]/div[1]/div/text()')[0]
    publishedTime = treeContent.xpath('normalize-space(//*[@id="main-container"]/div[3]/div/div[1]/div[2]/text())')
    lead = treeContent.xpath('//*[@id="main-container"]/div[3]/div/header/p/text()')[0]
    contentList = treeContent.xpath('//*[@id="main-container"]/div[3]/div/div[2]/article/p/text() | //*[@id="main-container"]/div[3]/div/div[2]/article//strong/text()')
    content = ""
    for el in contentList:
        # print(el)
        content += el + " "

    result['author'] = author
    result['publishedTime'] = publishedTime
    result['title'] = title
    result['subtitle'] = subtitle
    result['lead'] = lead
    result['content'] = content

    return json.dumps(result)

def extract_from_zurnal24(htmlContent):
    result = {
        "author": "",
        "publishedTime": "",
        "title": "",
        "viewCount": "",
        "lead": "",
        "content": ""
    }
    treeContent = html.fromstring(htmlContent)
    articleHeader = treeContent.xpath('//article/header')[0] 
    viewCount = articleHeader.xpath('div[1]/span/strong/text()')[0]
    title = articleHeader.xpath('h1/text()')[0]
    author = articleHeader.xpath('div[2]/a/text()')[0]
    publishedTime = articleHeader.xpath('time/text()')[0]
    lead = treeContent.xpath('//article/div/div[2]/div/div[3]/text()')[0]
    contentList = treeContent.xpath('//article/div/div[2]/div/div[5]//text()[normalize-space(.)]')

    content = ""
    for el in contentList:
        content += el.strip() + " "

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
#     htmlContent = ""
    # with io.open('../input-extraction/jewelry01.html', mode='r', encoding='windows-1252') as file:
    #     htmlContent = file.read()
    # extract_from_overstock(htmlContent)
    # with io.open('../input-extraction/jewelry02.html', mode='r', encoding='windows-1252') as file:
    #     htmlContent = file.read()
    # extract_from_overstock(htmlContent)
    # with io.open('../input-extraction/Audi_A6_50_TDI_quattro_nemir_v_premijskem_razredu-RTVSLO.si.html', mode='r', encoding='utf-8') as file:
    #     htmlContent = file.read()
    # extract_from_rtvslo(htmlContent)
    # with io.open('../input-extraction/Volvo XC 40_D4_AWD_momentum_suvereno_med_najboljše_v_razredu-RTVSLO.si.html', mode='r', encoding='utf-8') as file:
    #     htmlContent = file.read()
    # extract_from_rtvslo(htmlContent)
    # with io.open('../input-extraction/polo.html', mode='r', encoding='utf-8') as file:
    #     htmlContent = file.read()
    # extract_from_zurnal24(htmlContent)
    # with io.open('../input-extraction/audi.html', mode='r', encoding='utf-8') as file:
    #     htmlContent = file.read()
    # extract_from_zurnal24(htmlContent)