from django.urls import path
from . import views

urlpatterns = [
    path('data/', views.show_data, name='show_data'),
    path('data/<str:state>/', views.show_data_details, name='show_data_details'),
    path('chat/', views.chat_index, name='chat_index'),
]