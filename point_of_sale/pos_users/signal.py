from django.contrib.auth.models import User
from .models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def add_profile(sender, instance, created, **kwargs):
    '''
    create the profile of the user
    '''
    if created:
        profile = Profile.objects.create(user=instance)


