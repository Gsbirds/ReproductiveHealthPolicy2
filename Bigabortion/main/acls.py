import requests
from .keys import ABORTION_API_KEY, OPENAI_API_KEY
import json
from .models import AbortionData
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def getAbortionData(state):
    headers = {"token": ABORTION_API_KEY}

    params = {
        "state_name": state,
    }

    url = f'https://api.abortionpolicyapi.com/v1/gestational_limits/states/'

    response = requests.get(url, params=params, headers=headers)
    print("I MADE A REQUEST TO EXTERNAL PLACE")
    # content=response.json()
    content = json.loads(response.content)

    try:
        return {"policy": content[state]}
    except (KeyError, IndexError):
        return {"policy": None}
    
def getAbortionWaiting(state):
    headers = {"token": ABORTION_API_KEY}

    params = {
        "state_name": state,
    }

    url = "https://api.abortionpolicyapi.com/v1/waiting_periods/states/"

    response = requests.get(url, params=params, headers=headers)
    # content=response.json()
    content = json.loads(response.content)

    try:
        return {"policy": content[state]}
    except (KeyError, IndexError):
        return {"policy": None}
    
def getAbortionInsurance(state):
    headers = {"token": ABORTION_API_KEY}

    params = {
        "state_name": state,
    }

    url = "https://api.abortionpolicyapi.com/v1/insurance_coverage/states/"

    response = requests.get(url, params=params, headers=headers)
    # content=response.json()
    content = json.loads(response.content)

    try:
        return {"policy": content[state]}
    except (KeyError, IndexError):
        return {"policy": None}


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
    reply = content['choices'][0]['message']['content']

    return {'response': reply}