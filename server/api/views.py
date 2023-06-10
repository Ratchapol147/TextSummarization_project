from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .serializer import txtsumSerializer, datafullSerializer, RegistrationSerializer
from database.models import datafull, txtsum
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
import uuid
from rest_framework.views import APIView
from .function import calculate, calculate_word, checkword, countword, delspace, fronhightliht, hightliht, hightlihtforapi, repeat_word
from pythainlp.tokenize import word_tokenize
from rest_framework import viewsets
from api import serializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.permissions import IsAuthenticated
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework_api_key.models import APIKey
from django.utils.datastructures import MultiValueDictKeyError

class RegistrationAPIView(generics.GenericAPIView):

    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception = True)
        # serializer.save()

        
    
        if (serializer.is_valid()):
            serializer.save()
            
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "User created successfully",

                "User": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = serializer.CustomTokenObtainPairSerializer



class statuss(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        return Response({'status': status.HTTP_200_OK})


class datafullDetail(generics.RetrieveAPIView):
    queryset = datafull.objects.all()
    serializer_class = datafullSerializer
    permission_classes = [permissions.IsAuthenticated]


class txtsumDetail(generics.RetrieveAPIView):
    queryset = txtsum.objects.all()
    serializer_class = txtsumSerializer
    permission_classes = [permissions.IsAuthenticated]

from database.models import APIkey
from app.serializer import UserSerializer
import json
class getApiKey(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):

        """Retrieve a project based on the request API key."""
        user = request.user
        serialized_user = UserSerializer(user).data
        api_key, key = APIKey.objects.create_key(name="ApiNectec")
        manager = serialized_user['id']
        key_save = APIkey.objects.create(APIkey=key,manager=manager)

        key_save.save()
        return Response({'api_key': key })
    
from rest_framework_api_key.models import BaseAPIKeyManager

class OrganizationAPIKeyManager(BaseAPIKeyManager):
    def get_usable_keys(self):
        return super().get_usable_keys().filter(organization__active=True)


class ApiNectec(generics.RetrieveAPIView):
    
    """
    similarity = เปอร์เช็นความเหมือน 
    similarityWord = คำที่เหมือนกัน
    Cutworddata1 = การตัดคำ
    Cutworddata2 = การตัดคำ
    HTMLTag1 = ส่วนแสดง Tag HTML:5
    wordnotFound = จำนวนคำที่ไม่เจอ
    wordFound = จำนวนคำที่เจอ
    """

    def post(self, request):
        permission_classes = [HasAPIKey]
        data1 = request.data['data1']
        data2 = request.data['data2']

        wordnotFound_data, wordFound, wordnotFound, cal_data = calculate_word(data1, data2)

        b1 = word_tokenize(data1, engine='newmm')
        b2 = word_tokenize(data2, engine='newmm')

        lendata1 = len(b1)
        lendata2 = len(b2)

        testsum = hightlihtforapi(data1, data2)

        res = delspace(testsum)
        sorted_data = (sorted(res, key=len, reverse=True))
        a, b = repeat_word(sorted_data)

        hig1, hig2 = fronhightliht(data1, data2, a)

        request.data['wordnotFound'] = wordnotFound
        request.data['wordFound'] = wordFound
        request.data['similarity'] = cal_data
        request.data['similarityWord'] = testsum
        request.data['Cutworddata1'] = b1
        request.data['Cutworddata2'] = b2
        request.data['countworddata1'] = lendata1
        request.data['countworddata2'] = lendata2
        request.data['HTMLTag1'] = hig1
        request.data['HTMLTag2'] = hig2

        return Response(
            {
                'data': request.data
            }
        )

class functions(APIView):
        """
        API call in Database
        """
        permission_classes = [permissions.IsAuthenticated]
        def post(self,request):

            # id =int(request.data['input'])
            try: id = int(request.data['input'])
            except MultiValueDictKeyError:
                id = 1
        
            data_datafull = datafull.objects.get(id=id)
            data_txtsim   = txtsum.objects.get(id=id)
            text_content_datafull = data_datafull.news_content
            text_abstractive_datafull = data_datafull.abstractive
            text_extractive_datafull = data_datafull.extractive

            text_content = data_txtsim.content
            text_abstractive = data_txtsim.abstractive
            text_extractive = data_txtsim.extractive

    

            
            hightlihttext_ext = hightliht(text_content,text_extractive)
            hightlihttext_abs = hightliht(text_content,text_abstractive)

            
            
            res_ext = delspace(hightlihttext_ext)
            res_abs = delspace(hightlihttext_abs)

            sorted_data_ext = (sorted(res_ext,key = len, reverse=True))
            sorted_data_abs = (sorted(res_abs,key = len, reverse=True))


            count_word_con =countword(text_content_datafull)
            count_word_ext =countword(text_extractive_datafull)
            count_word_abs =countword(text_abstractive_datafull)

            wordnotFound_abs,int_wordFound_content_abs,int_wordnotFound_abs,cal_abs = calculate_word(text_content_datafull,text_abstractive_datafull) #abstractive
            wordnotFound_ext,int_wordFound_content_ext,int_wordnotFound_ext,cal_ext = calculate_word(text_content_datafull,text_extractive_datafull) #extractive
            
            a_ext ,b_ext = repeat_word(sorted_data_ext) 
            a_abs ,b_abs = repeat_word(sorted_data_abs) 
            # a ลบตัวซ้ำในข้อมูล
            # b ข้อมู,ที่ซ้ำในข้อมูล

            progress1 = (id/3190)*100
            progress = round(progress1)
            
            text_content_datafull_ext,text_extractive_datafull=fronhightliht(text_content_datafull,text_extractive_datafull,a_ext)
            text_content_datafull_abs,text_abstractive_datafull=fronhightliht(text_content_datafull,text_abstractive_datafull,a_abs)

        

            new_data_abs = round(cal_abs)
            new_data_ext = round(cal_ext)
            
            
            labels_ext =["Extractive"]
            labels_abs =["Abstractive"]
            data_ext =[new_data_ext]
            data_abs =[new_data_abs]

            request.data['text_content_def'] = text_content_datafull_ext,   ##ที่จะเปลี่ยนสี
            request.data['text_extractive_def'] = text_extractive_datafull,  ##ที่จะเปลี่ยนสี
            #========
            request.data['text_content_datafull_abs'] = text_content_datafull_abs, ##ที่จะเปลี่ยนสี
            request.data['text_abstractive_datafull'] = text_abstractive_datafull, ##ที่จะเปลี่ยนสี
            #===============================================
            request.data['id'] = id,
            request.data['progress'] = progress,
            #========
            request.data['wordnotFound_ext'] = wordnotFound_ext,
            request.data['int_wordFound_content_ext'] = int_wordFound_content_ext,
            request.data['int_wordnotFound_ext'] = int_wordnotFound_ext,
            #========
            request.data['wordnotFound_abs'] = wordnotFound_abs,
            request.data['int_wordFound_content_abs'] = int_wordFound_content_abs,
            request.data['int_wordnotFound_abs'] = int_wordnotFound_abs,
            #========
            request.data['count_word_con'] = count_word_con,
            #========
            request.data['count_word_ext'] = count_word_ext,
            #========
            request.data['count_word_abs'] = count_word_abs,
            #========
            request.data['labels_ext'] = labels_ext,
            request.data['labels_abs'] = labels_abs,
            request.data['data_ext'] = data_ext,
            request.data['data_abs'] = data_abs,

            return Response(
            {
            'data': request.data
             }
        )
