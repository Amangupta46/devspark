from django.db import models

from common.models import BaseModel


class Organization(BaseModel):
    name = models.CharField(max_length=255)
    domain = models.CharField(max_length=255, unique=True, blank=True)

    def __str__(self):
        return self.name


class OrgSettings(BaseModel):
    organization = models.OneToOneField(
        Organization, on_delete=models.CASCADE, related_name="settings"
    )
    standard_daily_hours = models.DecimalField(max_digits=4, decimal_places=2, default=8.00)
    standard_weekly_hours = models.DecimalField(max_digits=5, decimal_places=2, default=40.00)
    timezone = models.CharField(max_length=100, default="UTC")
    branding_logo_url = models.URLField(blank=True)
    leave_policy_text = models.TextField(blank=True)

    def __str__(self):
        return f"Settings for {self.organization.name}"


class Department(BaseModel):
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="departments"
    )
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.name} ({self.organization.name})"


class Team(BaseModel):
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="teams")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.department.name}"
