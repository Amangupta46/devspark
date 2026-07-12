from django.conf import settings
from django.db import models

from common.models import BaseModel

from .core import Project
from .tasks import ProjectTask


class ProjectComment(BaseModel):
    project: models.ForeignKey = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="comments", null=True, blank=True
    )
    task: models.ForeignKey = models.ForeignKey(
        ProjectTask, on_delete=models.CASCADE, related_name="comments", null=True, blank=True
    )
    author: models.ForeignKey = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    content: models.TextField = models.TextField()

    # Threading
    parent: models.ForeignKey = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    # Simple mention storage for notifications
    mentions: models.ManyToManyField = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="mentioned_in_comments", blank=True
    )

    def __str__(self) -> str:
        return f"Comment by {self.author} on {self.created_at}"


class ProjectFile(BaseModel):
    project: models.ForeignKey = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="files", null=True, blank=True
    )
    task: models.ForeignKey = models.ForeignKey(
        ProjectTask, on_delete=models.CASCADE, related_name="files", null=True, blank=True
    )
    uploaded_by: models.ForeignKey = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )

    file: models.FileField = models.FileField(upload_to="projects/files/")
    title: models.CharField = models.CharField(max_length=255, blank=True)

    def __str__(self) -> str:
        return self.file.name


class ProjectActivity(BaseModel):
    project: models.ForeignKey = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="activities"
    )
    task: models.ForeignKey = models.ForeignKey(
        ProjectTask, on_delete=models.CASCADE, null=True, blank=True
    )
    user: models.ForeignKey = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )

    action: models.CharField = models.CharField(max_length=255)
    description: models.TextField = models.TextField(blank=True)

    def __str__(self) -> str:
        return f"{self.action} on {self.project.project_code}"
