from django.conf import settings
from django.db import models

from common.models import BaseModel


class Project(BaseModel):
    STATUS_CHOICES = [
        ("planning", "Planning"),
        ("requirement_analysis", "Requirement Analysis"),
        ("ui_ux", "UI UX"),
        ("development", "Development"),
        ("testing", "Testing"),
        ("review", "Review"),
        ("deployment", "Deployment"),
        ("completed", "Completed"),
        ("maintenance", "Maintenance"),
        ("cancelled", "Cancelled"),
    ]

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("critical", "Critical"),
    ]

    organization = models.ForeignKey(
        "team.Organization",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="projects",
    )
    project_id = models.CharField(max_length=50, unique=True)
    project_code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    company = models.ForeignKey("crm.Company", on_delete=models.SET_NULL, null=True, blank=True)
    client_contact = models.ForeignKey(
        "crm.Contact", on_delete=models.SET_NULL, null=True, blank=True
    )
    lead = models.ForeignKey("crm.Lead", on_delete=models.SET_NULL, null=True, blank=True)
    quote = models.ForeignKey("quotes.Quote", on_delete=models.SET_NULL, null=True, blank=True)
    proposal = models.ForeignKey(
        "quotes.Proposal", on_delete=models.SET_NULL, null=True, blank=True
    )

    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="managed_projects",
    )

    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="planning")
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default="medium")

    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)

    technology_stack = models.TextField(blank=True)
    repository_url = models.URLField(blank=True)
    staging_url = models.URLField(blank=True)
    production_url = models.URLField(blank=True)

    description = models.TextField(blank=True)
    notes = models.TextField(blank=True)

    budget = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    estimated_hours = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    actual_hours = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    completion_percentage = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"[{self.project_code}] {self.name}"


class ProjectPhase(BaseModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="phases")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.project.project_code} - {self.name}"


class Milestone(BaseModel):
    phase = models.ForeignKey(ProjectPhase, on_delete=models.CASCADE, related_name="milestones")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    deadline = models.DateField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.phase.project.project_code} - {self.name}"


class Sprint(BaseModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="sprints")
    sprint_number = models.PositiveIntegerField()
    goal = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    velocity = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.project.project_code} Sprint {self.sprint_number}"
