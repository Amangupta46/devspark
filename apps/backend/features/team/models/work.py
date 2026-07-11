from django.db import models

from common.models import BaseModel

from .members import TeamMember


class Worklog(BaseModel):
    member = models.ForeignKey(TeamMember, on_delete=models.CASCADE, related_name="worklogs")
    task = models.ForeignKey(
        "projects.ProjectTask",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="team_worklogs",
    )

    date = models.DateField()
    working_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    break_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    overtime_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.member.user.email} - {self.date} ({self.working_hours}h)"


class LeaveRequest(BaseModel):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
        ("cancelled", "Cancelled"),
    ]

    LEAVE_TYPES = [
        ("annual", "Annual Leave"),
        ("sick", "Sick Leave"),
        ("unpaid", "Unpaid Leave"),
        ("maternity", "Maternity/Paternity"),
    ]

    member = models.ForeignKey(TeamMember, on_delete=models.CASCADE, related_name="leaves")
    leave_type = models.CharField(max_length=50, choices=LEAVE_TYPES, default="annual")

    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    approved_by = models.ForeignKey(
        TeamMember, on_delete=models.SET_NULL, null=True, blank=True, related_name="approved_leaves"
    )

    def __str__(self):
        return f"{self.member.user.email} - {self.start_date} to {self.end_date} ({self.status})"
