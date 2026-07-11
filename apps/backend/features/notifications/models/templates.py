from django.db import models

from common.models import BaseModel


class MessageTemplate(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    category = models.ForeignKey(
        "notifications.NotificationCategory", on_delete=models.SET_NULL, null=True, blank=True
    )
    channel = models.CharField(
        max_length=50,
        choices=(
            ("email", "Email"),
            ("sms", "SMS"),
            ("in_app", "In-App"),
            ("whatsapp", "WhatsApp"),
            ("push", "Push"),
        ),
    )
    language = models.CharField(max_length=10, default="en")

    subject_template = models.CharField(
        max_length=255, blank=True, help_text="Used for Email/Push titles"
    )
    body_template = models.TextField(
        help_text="Markdown and variables supported. e.g., {{ user.name }}"
    )

    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("name", "channel", "language")

    def __str__(self):
        return f"Template {self.name} ({self.channel}-{self.language})"
