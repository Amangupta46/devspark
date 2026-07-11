from django.db import models

from common.models import BaseModel

from .core import Organization
from .members import TeamMember


class CalendarEvent(BaseModel):
    EVENT_TYPES = [
        ("meeting", "Meeting"),
        ("leave", "Leave/Time Off"),
        ("holiday", "Company Holiday"),
        ("deadline", "Project Deadline"),
    ]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    event_type = models.CharField(max_length=30, choices=EVENT_TYPES, default="meeting")

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    # Participants
    attendees = models.ManyToManyField(TeamMember, related_name="calendar_events", blank=True)

    def __str__(self):
        return f"{self.title} ({self.get_event_type_display()})"
