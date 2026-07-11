from django.conf import settings
from django.db import models

from common.models import BaseModel


class ClientUser(BaseModel):
    ROLES = [("owner", "Owner"), ("admin", "Admin"), ("manager", "Manager"), ("viewer", "Viewer")]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="client_profile"
    )
    company = models.ForeignKey(
        "crm.Company", on_delete=models.CASCADE, related_name="client_users"
    )
    contact = models.OneToOneField("crm.Contact", on_delete=models.SET_NULL, null=True, blank=True)

    role = models.CharField(max_length=20, choices=ROLES, default="viewer")

    is_primary_contact = models.BooleanField(default=False)
    is_billing_contact = models.BooleanField(default=False)
    is_technical_contact = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.company.name} ({self.role})"


class ClientSettings(BaseModel):
    client = models.OneToOneField(ClientUser, on_delete=models.CASCADE, related_name="settings")
    language = models.CharField(max_length=20, default="en")
    timezone = models.CharField(max_length=100, default="UTC")
    theme = models.CharField(
        max_length=20,
        default="system",
        choices=[("light", "Light"), ("dark", "Dark"), ("system", "System")],
    )
    email_notifications = models.BooleanField(default=True)

    def __str__(self):
        return f"Settings for {self.client.user.email}"
