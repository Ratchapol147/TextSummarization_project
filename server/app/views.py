from .serializer import ChangePasswordSerializer,UpdateUserSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response

class getUser(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        serialized_user = UserSerializer(user).data
        return Response({'user': serialized_user })
    
class UpdateProfileView(generics.UpdateAPIView):

    queryset = User.objects.all()
    # permission_classes = (IsAuthenticated,)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateUserSerializer

class ChangePasswordView(generics.UpdateAPIView):

    queryset = User.objects.all()
    # permission_classes = (IsAuthenticated,)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

class APIUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class UserList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
