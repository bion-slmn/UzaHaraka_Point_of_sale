from django.urls import path
from . import views
import os

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
        path('view-category/', views.view_categories, name='view_categories'),
        path('view-a-category/', views.view_a_category, name='view_a_category'),
        path('view-all-products/', views.view_all_products),
        path('view-a-product/', views.view_a_product, name='view_a_product'),
        path('view-sales/', views.view_sales, name='view_sales'),
        path('view-a-sales/', views.view_a_sales, name='view_a_sales'),
        path('view-a-category/', views.view_a_category, name='view_a_category'),
        path('make-sales/', views.make_sales, name='make_sales'),
        ]
