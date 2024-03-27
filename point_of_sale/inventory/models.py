from django.db import models
import uuid
from django.contrib.auth.models import User


# create a base models.for other models.

class BaseModel(models.Model):
    '''
    defines a base model for other to inherit
    '''
    id = models.UUIDField('id of the object',
                          primary_key=True,
                          default=uuid.uuid4,
                          editable=False
                          )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ''' this instructs django not to create a table for this class
        '''
        abstract = True


class Category(BaseModel):
    '''
    defines the category of the products
    '''
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    category_image = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Product(BaseModel):
    '''
    defines a product in the inventory
    '''
    name = models.CharField(max_length=100, unique=True)
    quantity = models.PositiveIntegerField()
    buying_price = models.FloatField()
    selling_price = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    product_image = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return self.name


class Sales(BaseModel):
    '''this records the sales history'''
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField()
    selling_price = models.FloatField()
    total = models.FloatField()

    def save(self,  *args, **kwargs):
        self.selling_price = self.product.selling_price
        self.total = self.product.selling_price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return self.product.name

    class Meta:
        verbose_name_plural = "Sales"
        ordering = ['-created_at']


class Purchase(BaseModel):
    '''
    this records the purchase history
    '''
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    buying_price = models.FloatField()
    total = models.FloatField()

    def __str__(self):
        return self.product.name
