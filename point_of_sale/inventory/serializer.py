'''
serialising django objects to python structures
'''
from .models import Product, Sales, Category, Purchase
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    '''
    serialise the product model
    '''
    class Meta:
        model = Product
        fields = '__all__'


class SalesSerializer(serializers.ModelSerializer):
    # specify model and fields
    '''
    serialise the Sales model
    '''
    product_name = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    def get_product_name(self, obj):
        return obj.product.name

    class Meta:
        model = Sales
        fields = '__all__'


class PurchaseSerializer(serializers.ModelSerializer):
    '''
    serialise the Purchase model
    '''
    class Meta:
        model = Purchase
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    '''
    serialize the category plus its relationship
    with the product
    '''
    product_set = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = '__all__'


class CategoryNoProductSerializer(serializers.ModelSerializer):
    '''
    serialise the category without the relationship to
    products
    '''
    class Meta:
        model = Category
        fields = '__all__'
