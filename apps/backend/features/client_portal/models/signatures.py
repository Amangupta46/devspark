from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from common.models import BaseModel

from .users import ClientUser


class DigitalSignature(BaseModel):
    # Can sign a Quote, Proposal, Contract, etc.
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    client_user = models.ForeignKey(ClientUser, on_delete=models.CASCADE)

    signature_hash = models.CharField(max_length=255, unique=True)
    ip_address = models.GenericIPAddressField()
    signed_at = models.DateTimeField(auto_now_add=True)

    legal_name_typed = models.CharField(max_length=255)

    def __str__(self):
        return f"Signature by {self.legal_name_typed} for {self.content_type} {self.object_id}"
