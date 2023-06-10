from django.contrib import admin
from .models import APIkey
# Register your models here.

class StatementAdmin(admin.ModelAdmin):
    list_display=['manager'] 

admin.site.register(APIkey,StatementAdmin)
