import sys
import io
import json
import regular
import xpath
from road_runner import road_runner


def main(extraction_type):
    if extraction_type == 'A':
        html = ""
        print("Regex extraction from Overstock page 1:")
        with io.open('./input-extraction/jewelry01.html', mode='r', encoding='windows-1252') as file:
            html = file.read()
        res = regular.extract_from_overstock(html)
        with io.open('result_regex_overstock1.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Regex extraction from Overstock page 2:")
        with io.open('./input-extraction/jewelry02.html', mode='r', encoding='windows-1252') as file:
            html = file.read()
        res = regular.extract_from_overstock(html)
        with io.open('result_regex_overstock2.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Regex extraction from Rtvslo page 1:")
        with io.open('./input-extraction/car1.html', mode='r',
                     encoding='utf-8') as file:
            html = file.read()
        res = regular.extract_from_rtvslo(html)
        with io.open('result_regex_rtvslo1.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Regex extraction from Rtvslo page 2:")
        with io.open('./input-extraction/car2.html',
                     mode='r', encoding='utf-8') as file:
            html = file.read()
        res = regular.extract_from_rtvslo(html)
        with io.open('result_regex_rtvslo2.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Regex extraction from Žurnal24 page 1:")
        with io.open('./input-extraction/polo.html', mode='r', encoding='utf-8') as file:
            htmlContent = file.read()
        res = regular.extract_from_zurnal24(htmlContent)
        with io.open('result_regex_zurnal1.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Regex extraction from Žurnal24 page 2:")
        with io.open('./input-extraction/audi.html', mode='r', encoding='utf-8') as file:
            htmlContent = file.read()
        res = regular.extract_from_zurnal24(htmlContent)
        with io.open('result_regex_zurnal2.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

    elif extraction_type == 'B':
        html = ""
        print("Xpath extraction from Overstock page 1:")
        with io.open('./input-extraction/jewelry01.html', mode='r', encoding='windows-1252') as file:
            html = file.read()
        res = xpath.extract_from_overstock(html)
        with io.open('result_xpath_overstock1.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Xpath extraction from Overstock page 2:")
        with io.open('./input-extraction/jewelry02.html', mode='r', encoding='windows-1252') as file:
            html = file.read()
        res = xpath.extract_from_overstock(html)
        with io.open('result_xpath_overstock2.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Xpath extraction from Rtvslo page 1:")
        with io.open('./input-extraction/car1.html', mode='r',
                     encoding='utf-8') as file:
            html = file.read()
        res = xpath.extract_from_rtvslo(html)
        with io.open('result_xpath_rtvslo1.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Xpath extraction from Rtvslo page 2:")
        with io.open('./input-extraction/car2.html',
                     mode='r', encoding='utf-8') as file:
            html = file.read()
        res = xpath.extract_from_rtvslo(html)
        with io.open('result_xpath_rtvslo2.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Xpath extraction from Žurnal24 page 1:")
        with io.open('./input-extraction/polo.html', mode='r', encoding='utf-8') as file:
            htmlContent = file.read()
        res = xpath.extract_from_zurnal24(htmlContent)
        with io.open('result_xpath_zurnal1.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

        print("Xpath extraction from Žurnal24 page 2:")
        with io.open('./input-extraction/audi.html', mode='r', encoding='utf-8') as file:
            htmlContent = file.read()
        res = xpath.extract_from_zurnal24(htmlContent)
        with io.open('result_xpath_zurnal2.json', 'w') as f:
            json.dump(json.loads(res), f, indent=4)
        print(json.dumps(json.loads(res), indent=4))

    elif extraction_type == 'C':
        WINDOWS = 'windows-1252'
        UTF = 'utf-8'
        print("Generation of extraction rules for Overstock using road runner:")
        road_runner('./input-extraction/jewelry01.html', './input-extraction/jewelry01.html', WINDOWS)

        print("Generation of extraction rules for Rtvslo using road runner:")
        road_runner('./input-extraction/car1.html',
                    './input-extraction/car2.html',
                    UTF)

        print("Generation of extraction rules for Žurnal24 using road runner:")
        road_runner('./input-extraction/polo.html', './input-extraction/audi.html', UTF)
    else:
        print("Unknown extraction type. Possible extraction types are A, B or C!")


if __name__ == '__main__':
    main(sys.argv[1])
