from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .encoder import AbortionDataListEncoder,  AbortionDataDetailEncoder
from .models import AbortionData
from .acls import getAbortionData, getAbortionWaiting, getAbortionInsurance, getAbortionClinics
# # Create your views here.

def chat_index(request):
    return render(request, "chat/index.html")

@require_http_methods(["GET", "POST"])
def show_data(request):
    if request.method=="GET":
    #get all recipes from recipes table
        abortion_data = AbortionData.objects.all()
        # works= Work.objects.all()
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
    
@require_http_methods(["GET", "DELETE", "PUT"])
def show_data_details(request, id):
    if request.method == "GET":
        abortion = AbortionData.objects.get(id=id)
        data = getAbortionData(abortion.state)
        waiting= getAbortionWaiting(abortion.state)
        insurance=getAbortionInsurance(abortion.state)
        clinics=getAbortionClinics(abortion.state)
        
        return JsonResponse(
            {"abortion":abortion, "data":data, "waiting":waiting, "insurance":insurance, "clinics":clinics}, 
            encoder=AbortionDataDetailEncoder, 
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = AbortionData.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        AbortionData.objects.filter(id=id).update(**content)
        Abortion_Data = AbortionData.objects.get(id=id)
        
        return JsonResponse(
            Abortion_Data,
            encoder=AbortionDataDetailEncoder,
            safe=False,
        )
    
def redirect_to_page(request):
    return redirect("home_page")
