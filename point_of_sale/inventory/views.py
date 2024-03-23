from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializer import (
        CategorySerializer,
        PurchaseSerializer,
        SalesSerializer,
        ProductSerializer,
        )
from .models import Category, Sales, Purchase, Product
from rest_framework import status
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated


# see all categories


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_categories(request):
    '''
    view all the categories
    '''
    categories = Category.objects.all()
    serial = CategorySerializer(categories, many=True)
    return Response(serial.data, status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_a_category(request):
    '''
    view a specific category and the products associated with
    '''
    id = request.query_params.get('id')
    try:
        category = get_object_or_404(Category, pk=id)
    except Exception:
        return Response('Category Not found', status.HTTP_404_NOT_FOUND)
    serial = CategorySerializer(category)
    return Response(serial.data, status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_products(request):
    '''
    list all products in the database
    '''
    serializer = ProductSerializer(
                                  Product.objects.all(),
                                  many=True
                                  )

    return Response(serializer.data, status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_a_product(request):
    '''
    view the details of a single product
    '''
    id = request.query_params.get('id')
    try:
        product = get_object_or_404(Product, pk=id)
    except Exception:
        return Response('Product Not found', status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product)
    return Response(serializer.data, status.HTTP_200_OK)


# view all sales by that user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_sales(request):
    '''view all sales from a particular employee
    '''
    user = request.user

    sales = user.sales_set.all()
    serializer = SalesSerializer(sales, many=True)
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_a_sales(request):
    '''
    view a specific sale
    '''
    id = request.query_params.get('id')
    try:
        sale = get_object_or_404(Sales, pk=id)
    except Exception:
        return Response('Sale Not found', status.HTTP_404_NOT_FOUND)
    serializer = SalesSerializer(sale)
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_sales(request):
    '''
    make a sales
    '''
    id = request.data.get('id')
    qty = int(request.data.get('quantity'))
    selling_price = float(request.data.get('selling_price'))

    try:
        pdt_obj = get_object_or_404(Product, pk=id)
        sale = Sales.objects.create(
                product=pdt_obj,
                quantity=qty,
                selling_price=selling_price,
                user=request.user
                )
        print(12323)
        return Response('Sucessful sale', status.HTTP_201_CREATED)
    except ValidationError as error:
        # a signal raises the error if the quantity of sale
        # is higher than the inventory
        
        return Response(error, status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(e, status.HTTP_404_NOT_FOUND)
