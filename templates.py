import os

# Define folder structure
folders = [
    "data",
    "scrapers",
    "models",
    "backend"
]

# Define files with initial content
files = {
    "README.md": "# HackSentinel 🚀\n\nCyber Threat Intelligence Bot powered by AI.\n",
    "scrapers/cve_scraper.py": '''import requests
import json

def fetch_cve_data():
    url = "https://services.nvd.nist.gov/rest/json/cves/1.0"
    response = requests.get(url)
    data = response.json()
    
    # Save to JSON
    with open("../data/cve_data.json", "w") as file:
        json.dump(data, file, indent=4)
    
    print("[✔] CVE Data Saved!")

if __name__ == "__main__":
    fetch_cve_data()
''',
    "scrapers/news_scraper.py": '''import requests
from bs4 import BeautifulSoup

def fetch_news():
    url = "https://thehackernews.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    articles = soup.find_all("a", class_="story-link")
    
    for article in articles[:5]:  # Fetch first 5 news articles
        print(article.text.strip())

if __name__ == "__main__":
    fetch_news()
''',
    "backend/api.py": '''from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Welcome to HackSentinel API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
'''
}

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files with default content
for file, content in files.items():
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("[✔] HackSentinel Repo Structure Created Successfully!")
