from django.conf import settings
from django.db import models

from common.models import BaseModel

from .leads import Lead


class CommunicationLog(BaseModel):
    TYPE_CHOICES = [
        ("email", "Email"),
        ("call", "Call"),
        ("whatsapp", "WhatsApp"),
        ("sms", "SMS"),
        ("meeting", "Meeting"),
    ]

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="communications")
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    summary = models.TextField()
    performed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"{self.get_type_display()} on {self.timestamp}"


class Meeting(BaseModel):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="meetings")
    title = models.CharField(max_length=255)
    meeting_link = models.URLField(blank=True)
    duration_minutes = models.IntegerField(default=30)
    scheduled_time = models.DateTimeField()
    outcome = models.TextField(blank=True)
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title


class LeadNote(BaseModel):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="notes")
    content = models.TextField()  # Rich text
    is_private = models.BooleanField(default=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Note by {self.author} on {self.lead.lead_number}"


class FollowUp(BaseModel):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("missed", "Missed"),
    ]
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="followups")
    scheduled_date = models.DateTimeField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notify_email = models.BooleanField(default=True)
    notify_whatsapp = models.BooleanField(default=False)
    notify_in_app = models.BooleanField(default=True)

    def __str__(self):
        return f"Follow up for {self.lead.lead_number} on {self.scheduled_date}"


class SalesTask(BaseModel):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
    ]
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    deadline = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class LeadAttachment(BaseModel):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="attachments")
    file = models.FileField(upload_to="crm/attachments/")
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.file.name


class ActivityTimeline(BaseModel):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="timeline")
    action = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.action} on {self.lead.lead_number}"
