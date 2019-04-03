"""applyInnopolis URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .rest import views
from rest_framework.authtoken import views as auth_views

urlpatterns = [
    path(r'api/', include([
        path('me', views.ExampleView.as_view()),

        path('user/login/', auth_views.obtain_auth_token),

        path('user/signup/', views.signup),

        # TODO: delete tutorial
        path('admin/', admin.site.urls),
        path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    ])),
]
