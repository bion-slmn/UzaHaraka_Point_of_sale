'''
creating endpoints for the inventory APIS
'''
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializer import (
        CategorySerializer,
        CategoryNoProductSerializer,
        PurchaseSerializer,
        SalesSerializer,
        ProductSerializer,
        )
from .models import Category, Sales, Purchase, Product
from rest_framework import status
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import cache_page
from django.core.cache import cache
import time
from uuid import UUID


# see all categories

@cache_page(60 * 15)
@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def view_categories(request):
    '''
    view all the categories
    '''
    categories = Category.objects.all().values('id', 'name', 'description')
    return Response(categories, status.HTTP_200_OK)


@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def view_a_category(request):
    '''
    view a specific category and the products associated with
    using a serialiser that can read the many side of the relationship
    '''
    # check the cache first
    id = request.query_params.get('id')
    cached_data = cache.get(f'category_data_{id}')
    if cached_data:
        return Response(cached_data, status.HTTP_200_OK)

    # if cache miss
    try:
        category = get_object_or_404(Category.objects.defer(
                                    "category_image", 
                                    "updated_at"),
                                     pk=id)

    except Exception as e:
        return Response('Category Not found', status.HTTP_404_NOT_FOUND)
    serial = CategorySerializer(category)
    cache.set(f'category_data_{id}', serial.data, timeout=60 * 15)
    return Response(serial.data, status.HTTP_200_OK)


@cache_page(60 * 15)
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
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
# @permission_classes([IsAuthenticated])
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
@cache_page(60 * 15)
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def view_sales(request):
    '''view all sales from a particular employee
    '''
    serializer = SalesSerializer(Sales.objects.all(), many=True)
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def view_a_sales(request):
    '''
    view a specific sale
    '''
    id = request.query_params.get('id')

    # check if its available in a cache
    cache_data = cache.get(f'sale_data_{id}')
    if cache_data:
        return Response(cache_data, status.HTTP_200_OK)
    
    # if its a cache miss, check the database
    try:
        sale = get_object_or_404(Sales, pk=id)
    except Exception:
        return Response('Sale Not found', status.HTTP_404_NOT_FOUND)
    serializer = SalesSerializer(sale)
    cache.set(f'sale_data_{id}', serialiser.data, timeout=60 * 15)
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def make_sales(request):
    '''
    make a sales, it accepts sales of different items
    in an array of objects
    '''
    start_time = time.time()
    sales = request.data
    if not sales:

        return Response('Sales cant be empty', status.HTTP_404_NOT_FOUND)

    if not isinstance(sales, list):
        return Response('Sales must be an array', status.HTTP_400_BAD_REQUEST)

    response = []
    product_ids = [sale.get('id') for sale in sales if sale.get('id')]
    # fetch all product from the database at once
    products = Product.objects.filter(pk__in=product_ids)
    
    product_mapping = {product.id: product for product in products}
    sale_objects = []
    # add the sale in the database
    for sale in sales:
        if not sale.get('id'):
            continue
        pdt_obj = product_mapping.get(UUID(sale.get('id')))
        try:
            sale_objects.append(Sales(
                    product=pdt_obj,
                    quantity=sale['quantity'],
                    selling_price=sale['selling_price'],
                    user=None
                    ))

            response.append({
                             pdt_obj.name: 'Sucessful sale',
                             'status': status.HTTP_200_OK
                             })
        except (ValidationError, Exception) as error:
            # a signal raises the error if the quantity of sale
            # is higher than the inventory
            response.append({
                            pdt_obj.name: str(error),
                            'status': status.HTTP_400_BAD_REQUEST
                            })
    print('Time taken: ', time.time() - start_time)
    return Response(response, status=status.HTTP_200_OK)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def search_by_name(request):
    '''
    search a product by name in the database
    the name of the product is passed as query parameter
    '''
    search = request.query_params.get('name')
    if not search:
        return Response('')
    product = Product.objects.filter(name__icontains=search)
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)
