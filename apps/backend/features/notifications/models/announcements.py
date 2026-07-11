from django.db import models

from common.models import BaseModel


class Announcement(BaseModel):
    title = models.CharField(max_length=255)
    content = models.TextField(help_text="Markdown supported")
    scope = models.CharField(
        max_length=50,
        choices=(
            ("global", "Global"),
            ("organization", "Organization"),
            ("department", "Department"),
        ),
    )
    organization = models.ForeignKey(
        "team.Organization", on_delete=models.CASCADE, null=True, blank=True
    )
    # Could link to a specific Department model if one exists. Using CharField for foundation.
    department = models.CharField(max_length=100, blank=True)

    is_active = models.BooleanField(default=True)
    starts_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Announcement: {self.title} ({self.scope})"
