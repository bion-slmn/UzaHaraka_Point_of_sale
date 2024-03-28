'''
registering the profile model in to admin so
that it can appear in the admin dashboard
'''
from django.contrib import admin
from .models import Profile


# Register your models here.
admin.site.register(Profile)
