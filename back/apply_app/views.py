from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser


class ExampleView(APIView):
    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `apply_app.CustomUser` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)


class CreateUser(APIView):
    permission_classes = (~IsAuthenticated,)

    def post(self, request, format=None):
        # request.data['firstName']
        # request.data['lastName']
        # ...

        # CustomUser.objects.create()

        return Response()


class LogoutView(APIView):
    """
    API endpoint which should normally invalidate authorization token,
    but instead leaves it as it is, expecting client to remove instead.
    """
    def get(self, request, **kw):
        return Response({
            "status": "ok",
            "debug": "now proceed to removing the token on the client-side.",
        })
