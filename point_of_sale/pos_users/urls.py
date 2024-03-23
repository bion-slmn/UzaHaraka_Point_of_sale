from django.urls import path
from . import views


urlpatterns = [
        path('login/', views.login),
        path('logout/', views.user_logout),
        path('changePassword/', views.change_password)
        ]
