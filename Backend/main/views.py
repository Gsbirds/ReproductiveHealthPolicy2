from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import AbortionData
from .acls import getAbortionData, getAbortionWaiting, getAbortionInsurance, getAbortionClinics

def populate_database():
    if AbortionData.objects.count() == 0:
        state_names = [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California",
            "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
            "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
            "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
            "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
            "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
            "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ]
        
        for state_name in state_names:
            AbortionData.objects.get_or_create(state=state_name)
    else:
        print("Database already populated.")

populate_database()


def catch_all_view(request):
    return render(request, 'frontend/build/index.html')

def chat_index(request):
    return render(request, "chat/index.html")

@require_http_methods(["GET"])
def show_data(request):
    try:
        populate_database()
        states = list(AbortionData.objects.values('state').distinct().order_by('state'))
        
        return JsonResponse({
            'abortion_data': states,
            'status': 'success'
        })
        
    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
    
@require_http_methods(["GET"])
def show_data_details(request, state):
    try:
        data = getAbortionData(state)
        waiting = getAbortionWaiting(state)
        insurance = getAbortionInsurance(state)
        
        response_data = {
            "data": data,
            "waiting": waiting,
            "insurance": insurance,
            "state": state
        }

        return JsonResponse(response_data, safe=False)

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
    
# def redirect_to_page(request):
#     return redirect("home_page")
