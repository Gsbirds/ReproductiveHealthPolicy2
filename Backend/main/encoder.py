from common.json import ModelEncoder
from .models import AbortionData


class AbortionDataListEncoder(ModelEncoder):
    model = AbortionData
    properties = ["state", "id"]

class AbortionDataDetailEncoder(ModelEncoder):
    model = AbortionData
    properties = [
    "state", "id"
    ]