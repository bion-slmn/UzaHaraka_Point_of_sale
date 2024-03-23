from django.contrib import admin

from .models import Product, Sales, Category, Purchase
# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    pass

admin.site.register(Product, ProductAdmin)

class SalesAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'created_at', 'quantity', 'selling_price', 'total', 'user_name')
    ordering = ["created_at"]

    def user_name(self, obj):
        return obj.user.username

admin.site.register(Sales, SalesAdmin)



class CategoryAdmin(admin.ModelAdmin):
    list_display = ( "name", "description", "total_products")
    ordering = ["name"]

    def total_products(self, obj):
        return Product.objects.filter(category=obj).count()

admin.site.register(Category, CategoryAdmin)

class PurchaseAdmin(admin.ModelAdmin):
    pass
admin.site.register(Purchase)
