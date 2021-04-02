import io

from bs4 import BeautifulSoup

html = ""
with io.open('../input-extraction/jewelry01.html', mode='r', encoding='windows-1252') as file:
    html = file.read()

html = BeautifulSoup(html)

print(html)
