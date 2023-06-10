"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include,re_path
from api import urls as api_url
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from api.views import RegistrationAPIView,CustomTokenObtainPairView
from .views import UpdateProfileView,ChangePasswordView,getUser,APIUserDetailView,UserList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

    #auth
    path('auth/register/', RegistrationAPIView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/refresh-token', TokenRefreshView.as_view(), name='refreshtoken'),
    path('auth/user/',getUser.as_view()),
    path('auth/UpdateProfileView/<int:pk>',UpdateProfileView.as_view()),
    path('auth/UpdatePassword/<int:pk>',ChangePasswordView.as_view()),

    #user
    path('auth/usertest/', UserList.as_view()),
    path('auth/usertest/<int:pk>', APIUserDetailView.as_view()),
]

urlpatterns = [path('ohm/backend/', include(urlpatterns))]
