import requests
from bs4 import BeautifulSoup

url = "https://icons8.com/line-awesome"

response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

arr = []
all = soup.select("div.icons__after > i")

for i in all:
    arr.append(i["class"])
print(arr)