from django.urls import path
from main.views import show_data, show_data_details, chat_index
from .consumer import ChatConsumer
urlpatterns = [
    path("api/data/",show_data, name="show_data"),
    path("" "api/data/<int:id>/",show_data_details, name="details"),
    path("", chat_index, name="chat_index"),
    path("ws/", ChatConsumer.as_asgi()),

]  