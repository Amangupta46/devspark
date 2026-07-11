from django.conf import settings
from django.db import models

from common.models import BaseModel

from .core import Company, Contact, LeadPipelineStage, LeadSource, LeadTag


class Lead(BaseModel):
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
    ]

    organization = models.ForeignKey(
        "team.Organization",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="crm_leads",
    )
    title = models.CharField(max_length=255, help_text="A brief title for this deal/lead.")
    lead_number = models.CharField(max_length=50, unique=True)

    # Relationships
    company = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True, related_name="leads"
    )
    contact = models.ForeignKey(
        Contact, on_delete=models.SET_NULL, null=True, blank=True, related_name="leads"
    )
    source = models.ForeignKey(LeadSource, on_delete=models.SET_NULL, null=True, blank=True)
    stage = models.ForeignKey(LeadPipelineStage, on_delete=models.PROTECT, related_name="leads")
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_leads",
    )
    tags = models.ManyToManyField(LeadTag, blank=True)

    # Lead Details
    estimated_budget = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    estimated_timeline = models.CharField(max_length=100, blank=True)
    expected_closing_date = models.DateField(null=True, blank=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default="medium")

    # Advanced capabilities
    lead_score = models.IntegerField(default=0)
    won_reason = models.TextField(blank=True)
    lost_reason = models.TextField(blank=True)

    def __str__(self):
        return f"Lead {self.lead_number}: {self.title}"


class LeadAssignmentHistory(BaseModel):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="assignment_history")
    assigned_from = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assignments_from",
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assignments_to",
    )
    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assignments_made",
    )

    def __str__(self):
        return f"{self.lead.lead_number} assigned to {self.assigned_to}"


class Proposal(BaseModel):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("sent", "Sent"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="proposals")
    title = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    sent_date = models.DateTimeField(null=True, blank=True)
    valid_until = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Proposal for {self.lead.lead_number} ({self.status})"
