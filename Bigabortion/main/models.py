from django.db import models
from django.urls import reverse


class AbortionData(models.Model):
    state = models.CharField(max_length=200)
    policy = models.TextField(null=True)

    def get_api_url(self):
        return reverse("details", kwargs={"id": self.id})

    # def __str__(self):
    #     return self.name
