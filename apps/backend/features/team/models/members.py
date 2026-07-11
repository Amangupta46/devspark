from django.conf import settings
from django.db import models

from common.models import BaseModel

from .core import Department, Organization, Team


class TeamMember(BaseModel):
    EMPLOYMENT_STATUS = [
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("contract", "Contract"),
        ("intern", "Intern"),
        ("terminated", "Terminated"),
    ]

    WORK_TYPE = [("remote", "Remote"), ("hybrid", "Hybrid"), ("office", "Office")]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="team_profile"
    )
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="members")
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True)

    manager = models.ForeignKey(
        "self", on_delete=models.SET_NULL, null=True, blank=True, related_name="reports"
    )

    employee_id = models.CharField(max_length=50, unique=True, blank=True)
    designation = models.CharField(max_length=255, blank=True)

    joining_date = models.DateField(null=True, blank=True)
    employment_status = models.CharField(
        max_length=50, choices=EMPLOYMENT_STATUS, default="full_time"
    )
    work_type = models.CharField(max_length=50, choices=WORK_TYPE, default="remote")

    timezone = models.CharField(max_length=100, default="UTC")

    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)

    # Resource Management Tracking Override
    available_hours_per_week = models.DecimalField(max_digits=5, decimal_places=2, default=40.00)

    def __str__(self):
        return f"{self.user.email} - {self.designation}"


class SkillMatrix(BaseModel):
    member = models.ForeignKey(TeamMember, on_delete=models.CASCADE, related_name="skills")
    skill_name = models.CharField(max_length=100)
    proficiency_level = models.PositiveIntegerField(default=1, help_text="1 to 5 scale")
    years_experience = models.DecimalField(max_digits=4, decimal_places=1, default=0.0)

    class Meta:
        unique_together = ("member", "skill_name")

    def __str__(self):
        return f"{self.skill_name} ({self.proficiency_level}/5) - {self.member.user.email}"
