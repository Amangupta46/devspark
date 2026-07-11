from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from common.models import BaseModel


class FinanceAuditTrail(BaseModel):
    actor = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255, help_text="e.g., invoice_approved, payment_received")

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.CharField(max_length=255)
    content_object = GenericForeignKey("content_type", "object_id")

    changes = models.JSONField(
        default=dict, blank=True, help_text="Diff or details of what changed"
    )
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return f"Audit {self.action} on {self.content_type} {self.object_id}"
