'''
create signals to update the quantities of the product on
sale and addition of stock
'''
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Product, Sales, Purchase
from django.core.exceptions import ValidationError


@receiver(pre_save, sender=Sales)
def update_inventory(sender, instance, **kwargs):
    '''
    signal to update the inventory when a sale occurs
    '''
    product = instance.product
    print(product.name)

    if product.quantity - instance.quantity < 0:
        raise ValidationError(
                "Sale quantity exceeds available quantity in inventory."
                )

    product.quantity -= instance.quantity
    product.save()


# we use pre so that the new total is calculated using
# new buying price
@receiver(pre_save, sender=Purchase)
def update_inventory(sender, instance, **kwargs):
    '''
    signal to update the inventory when a purchase is made
    '''
    product = instance.product
    product.quantity += instance.quantity
    product.buying_price = instance.buying_price
    instance.total = instance.quantity * instance.buying_price
    product.save()
