'''
contains endpoints for the user app such as login, logout and change passord
A user is authenicated is by session based management
'''
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist


# Create your views here.
@api_view(['POST'])
def login(request):
    '''
    login a user and create a session and crsftoken for the user,
    user can login using email or username
    '''
    name = request.data.get('username')
    password = request.data.get('password')

    if not name or not password:
        return Response(
                        'Name and Password is a must',
                        status=status.HTTP_404_NOT_FOUND
                        )

    user_obj = ''
    if '@' in name:
        email = name
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                            'Email not Known',
                            status=status.HTTP_404_NOT_FOUND
                            )

    name = user_obj.username if user_obj else name

    user = authenticate(request._request, username=name, password=password)

    if user:
        auth_login(request._request, user)

        # check if the profile has been set
        try:
            profile = user.profile
            pic = profile.profile_pic
        except ObjectDoesNotExist:
            pic = None

        name = {
                'username': user.username,
                'profilePic': pic.url if pic else None
                }
        return Response(name, status=status.HTTP_200_OK)
    return Response('Check that password', status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    '''
    log out a user, this deletes the sesion key in the database
    '''
    # genereate a report before loging out
    logout(request)
    data = {'success': 'Sucessfully logged out'}
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def change_password(request):
    '''
    change the password of the user
    '''
    email = request.data.get('email')
    new_password = request.data.get('new_password')

    user = get_object_or_404(User, email=email)

    if user:
        user.set_password(new_password)
        user.save()
        return Response('Success', status=status.HTTP_201_CREATED)
    return Response('User not found', status=status.HTTP_404_NOT_FOUND)
