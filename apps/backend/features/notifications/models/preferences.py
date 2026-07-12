from django.db import models

from common.models import BaseModel


class NotificationPreference(BaseModel):
    user = models.ForeignKey(
        "users.CustomUser",
        on_delete=models.CASCADE,
        related_name="notification_channel_preferences",
    )
    category = models.ForeignKey("notifications.NotificationCategory", on_delete=models.CASCADE)

    # Delivery schedules
    delivery_mode = models.CharField(
        max_length=50,
        choices=(
            ("instant", "Instant"),
            ("hourly_digest", "Hourly Digest"),
            ("daily_digest", "Daily Digest"),
            ("weekly_digest", "Weekly Digest"),
            ("monthly_digest", "Monthly Digest"),
            ("muted", "Muted"),
        ),
        default="instant",
    )

    # Channel toggles
    email_enabled = models.BooleanField(default=True)
    in_app_enabled = models.BooleanField(default=True)
    sms_enabled = models.BooleanField(default=False)
    push_enabled = models.BooleanField(default=False)
    whatsapp_enabled = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "category")

    def __str__(self):
        return f"Prefs for {self.user} - {self.category.name}"


class OrganizationBranding(BaseModel):
    organization = models.OneToOneField(
        "team.Organization", on_delete=models.CASCADE, related_name="branding"
    )
    logo_url = models.URLField(blank=True)
    primary_color = models.CharField(max_length=20, default="#000000")
    secondary_color = models.CharField(max_length=20, default="#ffffff")
    email_footer = models.TextField(blank=True)

    def __str__(self):
        return f"Branding for {self.organization}"
