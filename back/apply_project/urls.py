"""apply_project URL Configuration

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
from rest_framework.authtoken import views as auth_views

from apply_app import views

urlpatterns = [
    path(r'api/', include([
        path('me', views.ExampleView.as_view()),

        path('user/signup/create', views.signup_create),
        path('user/signup/verify/<str:hash>', views.signup_verify),
        path('user/signup/finish', views.signup_finish),

        path('user/login', auth_views.obtain_auth_token),
        path('user/logout', views.logout_view),

        path('user/<int:user_id>', views.UserView.as_view()),

        # TODO: delete tutorial
        path('admin/', admin.site.urls),
        path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    ])),
]
