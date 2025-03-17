import requests
from .keys import ABORTION_API_KEY, OPENAI_API_KEY
import json

def getAbortionData(state):
    headers = {"token": ABORTION_API_KEY}
    url = 'https://api.abortionpolicyapi.com/v1/gestational_limits/states/'

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        content = response.json()
        
        if state in content:
            return {"policy": content[state]}
        return {"policy": None, "error": f"No data found for {state}"}
        
    except requests.exceptions.RequestException as e:
        return {"policy": None, "error": str(e)}
    
def getAbortionWaiting(state):
    headers = {"token": ABORTION_API_KEY}
    url = "https://api.abortionpolicyapi.com/v1/waiting_periods/states/"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        content = response.json()
        
        if state in content:
            return {"policy": content[state]}
        return {"policy": None, "error": f"No waiting period data found for {state}"}
        
    except requests.exceptions.RequestException as e:
        return {"policy": None, "error": str(e)}
    
def getAbortionInsurance(state):
    headers = {"token": ABORTION_API_KEY}
    url = "https://api.abortionpolicyapi.com/v1/insurance_coverage/states/"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        content = response.json()
        
        if state in content:
            return {"policy": content[state]}
        return {"policy": None, "error": f"No insurance data found for {state}"}
        
    except requests.exceptions.RequestException as e:
        return {"policy": None, "error": str(e)}


def getAbortionClinics(state):

    headers = {
        'Authorization': 'Bearer '+OPENAI_API_KEY,
        'Content-Type': 'application/json'
    }

    data = {
        "model": "gpt-3.5-turbo",
        'messages': [{'role': 'user', 'content': 'Give me resources to help women get an abortion who are from'+ state}]
    }

    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)

    content = json.loads(response.content)
    reply = content

    return {'response': reply}