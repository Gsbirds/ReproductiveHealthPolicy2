from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .encoder import AbortionDataListEncoder, AbortionDataDetailEncoder
from .models import AbortionData
from .acls import (
    getAbortionData,
    getAbortionWaiting,
    getAbortionInsurance,
    getAbortionClinics,
)


def populate_database():
    state_names = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ]

    for state_name in state_names:
        AbortionData.objects.create(state=state_name)


populate_database()


def catch_all_view(request):
    return render(request, "frontend/build/index.html")


def chat_index(request):
    return render(request, "chat/index.html")


@require_http_methods(["GET", "POST"])
def show_data(request):
    if request.method=="GET":
        abortion_data = AbortionData.objects.all()
        return JsonResponse(
            {"abortion_data": abortion_data},
            encoder=AbortionDataListEncoder,
        )
    else:
        content = json.loads(request.body)

    abortion_data = AbortionData.objects.create(**content)
    return JsonResponse(
        abortion_data,
        encoder=AbortionDataListEncoder,
        safe=False,
    )


@require_http_methods(["GET"])
def show_data_details(request, state):
    if request.method == "GET":
        try:
            data = getAbortionData(state)
            waiting = getAbortionWaiting(state)
            insurance = getAbortionInsurance(state)
            clinics = getAbortionClinics(state)

            response = JsonResponse(
                {
                    "data": data,
                    "waiting": waiting,
                    "insurance": insurance,
                    "clinics": clinics,
                },
                safe=False,
            )
            response["Content-Type"] = "application/json"
            response["Access-Control-Allow-Origin"] = "*"
            return response
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )
    return JsonResponse(
        AbortionData,
        encoder=AbortionDataDetailEncoder,
        safe=False,
    )


# def redirect_to_page(request):
#     return redirect("home_page")
