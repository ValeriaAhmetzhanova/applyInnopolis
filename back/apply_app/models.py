from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    phone = models.CharField(max_length=32)
    userStatus = models.IntegerField()

    def __str__(self):
        return self.email