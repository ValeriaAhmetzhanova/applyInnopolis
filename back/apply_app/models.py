import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

class CustomUser(models.Model):
    """
    The default authorization token model.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='extra',
        on_delete=models.CASCADE, verbose_name=_("User")
    )

    phone = models.CharField(_("Phone"), null=True, unique=True, max_length=32)
    userStatus = models.CharField(_("Candidate status"), max_length=32, null=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return str(self.user)


class EmailVerification(models.Model):
    """
    Temporal store for email verification keys.
    """
    key = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    first_name = models.CharField(max_length=30, verbose_name='first name')
    last_name = models.CharField(max_length=30, verbose_name='last name')
    email = models.EmailField(max_length=75, verbose_name='email address', unique=True)

    date = models.DateTimeField(default=timezone.now, verbose_name='request date')
