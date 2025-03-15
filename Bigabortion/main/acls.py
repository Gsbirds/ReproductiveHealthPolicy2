import requests
from .keys import ABORTION_API_KEY, OPENAI_API_KEY
import json
from .models import AbortionData
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


def getAbortionData(state):
    headers = {"token": ABORTION_API_KEY}
    
    # Convert state abbreviation to full name if needed
    state = get_full_state_name(state)
    
    url = f"https://api.abortionpolicyapi.com/v1/gestational_limits/states/"
    
    response = requests.get(url, headers=headers)
    print(f"API Response for {state}:", response.status_code)
    print("Response content:", response.content)
    content = json.loads(response.content)

    try:
        return {"policy": content[state]}
    except (KeyError, IndexError) as e:
        print(f"Error getting data for {state}:", str(e))
        return {"policy": None}


def getAbortionWaiting(state):
    headers = {"token": ABORTION_API_KEY}
    
    # Convert state abbreviation to full name if needed
    state = get_full_state_name(state)
    
    url = "https://api.abortionpolicyapi.com/v1/waiting_periods/states/"
    
    response = requests.get(url, headers=headers)
    print(f"API Response for {state}:", response.status_code)
    print("Response content:", response.content)
    content = json.loads(response.content)

    try:
        return {"policy": content[state]}
    except (KeyError, IndexError) as e:
        print(f"Error getting data for {state}:", str(e))
        return {"policy": None}


def getAbortionInsurance(state):
    headers = {"token": ABORTION_API_KEY}
    
    # Convert state abbreviation to full name if needed
    state = get_full_state_name(state)
    
    url = "https://api.abortionpolicyapi.com/v1/insurance_coverage/states/"
    
    response = requests.get(url, headers=headers)
    print(f"API Response for {state}:", response.status_code)
    print("Response content:", response.content)
    content = json.loads(response.content)

    try:
        return {"policy": content[state]}
    except (KeyError, IndexError) as e:
        print(f"Error getting data for {state}:", str(e))
        return {"policy": None}


def get_full_state_name(state):
    # Dictionary mapping state abbreviations to full names
    state_dict = {
        'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
        'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
        'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
        'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
        'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
        'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
        'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
        'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
        'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
        'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
        'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
        'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
        'WI': 'Wisconsin', 'WY': 'Wyoming'
    }
    
    # If it's already a full state name, return it
    if state in state_dict.values():
        return state
    
    # If it's an abbreviation, convert it
    if state.upper() in state_dict:
        return state_dict[state.upper()]
    
    # If we don't recognize it, return it unchanged
    return state

def getAbortionClinics(state):
    headers = {
        "Authorization": "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json",
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": "Give me resources to help women get an abortion who are from"
                + state,
            }
        ],
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=data
    )

    content = json.loads(response.content)
    reply = content

    return {"response": reply}
