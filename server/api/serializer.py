from rest_framework import serializers
from  database.models import txtsum,datafull 

from django.contrib.auth.models import User
from django.utils.datastructures import MultiValueDictKeyError
class RegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(max_length=50, min_length=6)
    username = serializers.CharField(max_length=50, min_length=6)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=150, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'password')

    def validate(self, args):
        email = args.get('email', None)
        username = args.get('username', None)
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': ('Email ซ้ำกรุณาเปลี่ยน')})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': ('username ซ้ำกรุณาเปลี่ยน')})

        return super().validate(args)
  

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    


############################################
from database.models import APIkey
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, User):





        token = super().get_token(User)
        
        iduser =User.id
        all_employee = APIkey.objects.filter(manager=iduser)
        for course in all_employee:
            key = course.APIkey
            if key is None:
                pass
            else:
                token['API'] = key
        token['name'] = User.username
        token['email'] = User.email
        token['is_superuser'] = User.is_superuser
        token['is_staff'] = User.is_staff

       

        return token

#################################

class txtsumSerializer(serializers.ModelSerializer):

    class Meta:
        
        fields = ('id', 'content', 'abstractive', 'extractive')
        model = txtsum

class datafullSerializer(serializers.ModelSerializer):

    class Meta:
        
        fields = ('id', 'news_author', 'news_title', 'news_content', 'news_counttext', 'news_datepublish', 'date_addtostored', 'extractive', 'abstractive')
        model = datafull

