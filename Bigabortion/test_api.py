import requests
from main.keys import ABORTION_API_KEY

def test_api():
    headers = {"token": ABORTION_API_KEY}
    url = "https://api.abortionpolicyapi.com/v1/gestational_limits/states/"
    # API doesn't accept query parameters, state should be in URL
    url = "https://api.abortionpolicyapi.com/v1/gestational_limits/states/California"
    
    try:
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}")  # Print first 500 characters of response
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_api()
