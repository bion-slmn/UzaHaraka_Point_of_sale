'''
creating profile model. this model is created automatically for each user
after the user is created using signals
'''
from django.db import models
from django.contrib.auth.models import User


# create a profile of a user
class Profile(models.Model):
    user = models.OneToOneField(
                                User,
                                on_delete=models.CASCADE,
                                related_name='profile'
                                )
    phone_number = models.CharField(max_length=15, null=True)
    profile_pic = models.ImageField(
                                    upload_to='profile_pics/',
                                    null=True,
                                    blank=True
                                    )

    def __str__(self):
        return self.user.username
