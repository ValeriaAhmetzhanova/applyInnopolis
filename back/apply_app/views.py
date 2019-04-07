import uuid

from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate, get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import *
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser, EmailVerification


non_authenticated = permission_classes((~IsAuthenticated,))


# TODO: remove me
class ExampleView(APIView):
    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `apply_app.CustomUser` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)


@api_view(['POST'])
@non_authenticated
def signup_create(request):
    try:
        first_name = request.data["firstName"]
        last_name = request.data["lastName"]
        email = request.data["email"]
    except KeyError as e:
        return Response(status=400, data={
            "description": "required field is missing",
            "field": e.args[0],
        })

    if not first_name or not last_name:
        return Response(status=400, data={
            "description": "first and/or last name is empty",
        })

    try:
        validate_email(email)
    except ValidationError:
        return Response(status=400, data={
            "description": "email is invalid",
        })

    if 0 != get_user_model().objects.filter(email=email).count():
        return Response(status=418, data={
            "description": "email already registered",
        })

    # 0. delete if exists
    EmailVerification.objects.filter(email=email).delete()
    # 1. generate unique key
    token = EmailVerification.objects.create(first_name=first_name, last_name=last_name, email=email)
    # 2. write key with email and first/last name to temporal store
    token.save()
    # 3. send email with key
    # TODO
    print('sending mail to {} with key {}'.format(email, token.key))

    return Response(status=200)


@api_view(['POST'])
@non_authenticated
def signup_verify(request):
    return Response(status=418)


@api_view(['POST'])
@non_authenticated
def signup_finish(request):
    return Response(status=418)


@api_view(['POST'])
def logout_view(request):
    """
    API endpoint which should normally invalidate authorization token,
    but instead leaves it as it is, expecting client to remove instead.
    """
    return Response({
        "status": "ok",
        "debug": "now proceed to removing the token on the client-side.",
    })


# @api_view(['POST'])
# def signup(request):
#     form = UserCreationForm(request.POST)
#     if form.is_valid():
#         form.save() # Why?
#         username = form.cleaned_data.get('username')
#         raw_password = form.cleaned_data.get('password1')
#         user = authenticate(username=username, password=raw_password)
#         login(request, user)
#         return Response()
#     return Response(status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id: int):
        return Response(status=418)

    def put(self, request, user_id: int):
        return Response(status=418)

    def delete(self, request, user_id: int):
        return Response(status=418)
