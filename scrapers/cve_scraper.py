import requests
import json
import os

def fetch_cve_data():
    url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            data = response.json()

            # ✅ Ensure that 'data' folder exists
            data_folder = os.path.join(os.path.dirname(__file__), "../data")
            if not os.path.exists(data_folder):
                os.makedirs(data_folder)  # ✅ Create folder if not exists

            # ✅ Save CVE data
            file_path = os.path.join(data_folder, "cve_data.json")
            with open(file_path, "w", encoding="utf-8") as file:
                json.dump(data, file, indent=4)

            print("[✔] CVE Data Saved Successfully!")
        except json.JSONDecodeError:
            print("[❌] Error: Invalid JSON response from API")
    else:
        print(f"[❌] Error {response.status_code}: {response.text}")

if __name__ == "__main__":
    fetch_cve_data()
