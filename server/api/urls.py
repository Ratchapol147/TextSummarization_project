from django.urls import path
from .views import datafullDetail,txtsumDetail,statuss,ApiNectec,getApiKey,functions
from api import views

urlpatterns = [
    path("status",statuss.as_view(),name="status"),
    path('txtsum/<int:pk>', views.txtsumDetail.as_view()),
    path('datafull/<int:pk>', views.datafullDetail.as_view()),
    path('ApiNectec/',ApiNectec.as_view(),name='ApiNectec'),
    path('getApiKey/',getApiKey.as_view(),name='ApiNectec'),
    path('functions/',views.functions.as_view(),name='functions')


]
