from django.conf import settings
from django.db import models

from common.models import BaseModel

from .core import Milestone, Project, Sprint


class ProjectTask(BaseModel):
    STATUS_CHOICES = [
        ("todo", "Todo"),
        ("in_progress", "In Progress"),
        ("code_review", "Code Review"),
        ("testing", "Testing"),
        ("blocked", "Blocked"),
        ("completed", "Completed"),
    ]

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    milestone = models.ForeignKey(
        Milestone, on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks"
    )
    sprint = models.ForeignKey(
        Sprint, on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks"
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_tasks",
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="todo")
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default="medium")

    estimated_hours = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    actual_hours = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    deadline = models.DateTimeField(null=True, blank=True)

    kanban_order = models.PositiveIntegerField(default=0)

    # Simple dependency handling (a task can depend on another task)
    depends_on = models.ManyToManyField("self", blank=True, symmetrical=False)

    class Meta:
        ordering = ["kanban_order", "-created_at"]

    def __str__(self):
        return f"[{self.project.project_code}] {self.title}"


class TimeLog(BaseModel):
    task = models.ForeignKey(ProjectTask, on_delete=models.CASCADE, related_name="time_logs")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    hours_logged = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    description = models.TextField(blank=True)
    is_manual = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.hours_logged}h by {self.user} on {self.task.title}"
