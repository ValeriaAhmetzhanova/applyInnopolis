from django.db import models
from django.conf import settings
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
