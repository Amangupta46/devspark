from django.db import models

from common.models import BaseModel

from .users import ClientUser


class Deliverable(BaseModel):
    project = models.ForeignKey(
        "projects.Project", on_delete=models.CASCADE, related_name="deliverables"
    )
    task = models.ForeignKey(
        "projects.ProjectTask", on_delete=models.SET_NULL, null=True, blank=True
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title


class DeliverableVersion(BaseModel):
    deliverable = models.ForeignKey(Deliverable, on_delete=models.CASCADE, related_name="versions")
    version_number = models.PositiveIntegerField(default=1)
    file = models.FileField(upload_to="deliverables/")
    upload_notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.deliverable.title} - v{self.version_number}"


class RevisionRequest(BaseModel):
    version = models.ForeignKey(
        DeliverableVersion, on_delete=models.CASCADE, related_name="revisions"
    )
    requested_by = models.ForeignKey(ClientUser, on_delete=models.CASCADE)

    comments = models.TextField()
    screenshot = models.ImageField(upload_to="revisions/screenshots/", null=True, blank=True)
    status = models.CharField(
        max_length=20,
        default="open",
        choices=[("open", "Open"), ("in_progress", "In Progress"), ("resolved", "Resolved")],
    )

    def __str__(self):
        return f"Revision for {self.version} by {self.requested_by.user.email}"
