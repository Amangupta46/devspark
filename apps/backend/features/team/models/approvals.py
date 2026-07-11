from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from common.models import BaseModel

from .core import Organization
from .members import TeamMember


class ApprovalFlow(BaseModel):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    # Generic relation to Leave, Quote, Payment, etc.
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    status = models.CharField(
        max_length=20,
        default="pending",
        choices=[("pending", "Pending"), ("approved", "Approved"), ("rejected", "Rejected")],
    )

    def __str__(self):
        return f"Approval Flow for {self.content_type} {self.object_id}"


class ApprovalStep(BaseModel):
    flow = models.ForeignKey(ApprovalFlow, on_delete=models.CASCADE, related_name="steps")
    approver = models.ForeignKey(TeamMember, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=1)
    status = models.CharField(
        max_length=20,
        default="pending",
        choices=[("pending", "Pending"), ("approved", "Approved"), ("rejected", "Rejected")],
    )
    comments = models.TextField(blank=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Step {self.order} - {self.approver.user.email} ({self.status})"
