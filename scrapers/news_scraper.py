import requests
import json
import os
from bs4 import BeautifulSoup

def fetch_cyber_news():
    url = "https://thehackernews.com/"  # Cybersecurity News Source
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.find_all("div", class_="body-post clear")  # ✅ Correct parent div

        news_list = []
        for article in articles[:10]:  # Fetch Top 10 News
            title_tag = article.find("h2", class_="home-title")
            desc_tag = article.find("div", class_="home-desc")

            title = title_tag.text.strip() if title_tag else "No title available"
            description = desc_tag.text.strip() if desc_tag else "No description available"

            news_list.append({"title": title, "description": description})

        # ✅ Ensure 'data' folder exists
        data_folder = os.path.join(os.path.dirname(__file__), "../data")
        if not os.path.exists(data_folder):
            os.makedirs(data_folder)

        # ✅ Save news to JSON
        file_path = os.path.join(data_folder, "cyber_news.json")
        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(news_list, file, indent=4)

        print("[✔] Cybersecurity News Saved Successfully!")

    else:
        print(f"[❌] Error {response.status_code}: Failed to fetch news")

if __name__ == "__main__":
    fetch_cyber_news()
