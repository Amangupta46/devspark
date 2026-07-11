from django.db import models

from common.models import BaseModel

from .members import TeamMember


class CodeReviewRequest(BaseModel):
    STATUS_CHOICES = [
        ("pending", "Pending Review"),
        ("changes_requested", "Changes Requested"),
        ("approved", "Approved"),
        ("merged", "Merged"),
    ]

    task = models.ForeignKey(
        "projects.ProjectTask", on_delete=models.CASCADE, related_name="code_reviews"
    )
    requester = models.ForeignKey(
        TeamMember, on_delete=models.CASCADE, related_name="requested_reviews"
    )
    reviewer = models.ForeignKey(
        TeamMember,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_reviews",
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    pull_request_url = models.URLField(blank=True)

    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="pending")

    def __str__(self):
        return f"Review for {self.task.title} by {self.requester.user.email}"
