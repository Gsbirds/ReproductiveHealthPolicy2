from django.contrib import admin
from main.models import AbortionData

# Register your models here.
class AbortionDataAdmin(admin.ModelAdmin):
    list_display=(
        "state",
        "policy",
        "id",
    )
admin.site.register(AbortionData, AbortionDataAdmin)

