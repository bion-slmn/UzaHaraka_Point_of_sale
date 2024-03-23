from .models import Product, Sales, Category, Purchase
from rest_framework import serializers


class SalesSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = Sales
        fields = '__all__'


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    product_set = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields =  '__all__'


