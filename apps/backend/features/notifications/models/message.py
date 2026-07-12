from django.db import models

from common.models import BaseModel


class Notification(BaseModel):
    recipient = models.ForeignKey(
        "users.CustomUser", on_delete=models.CASCADE, related_name="notifications"
    )
    category = models.ForeignKey(
        "notifications.NotificationCategory", on_delete=models.SET_NULL, null=True
    )
    priority = models.ForeignKey(
        "notifications.NotificationPriority", on_delete=models.SET_NULL, null=True
    )

    title = models.CharField(max_length=255)
    body = models.TextField()
    metadata = models.JSONField(default=dict, blank=True)

    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)
    is_archived = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification to {self.recipient}: {self.title}"


class NotificationDelivery(BaseModel):
    notification = models.ForeignKey(
        Notification, on_delete=models.CASCADE, related_name="deliveries"
    )
    channel = models.CharField(
        max_length=50,
        choices=(
            ("email", "Email"),
            ("sms", "SMS"),
            ("in_app", "In-App"),
            ("whatsapp", "WhatsApp"),
            ("push", "Push"),
            ("webhook", "Webhook"),
        ),
    )
    status = models.CharField(
        max_length=50,
        choices=(
            ("pending", "Pending"),
            ("sent", "Sent"),
            ("failed", "Failed"),
            ("retrying", "Retrying"),
        ),
        default="pending",
    )
    external_id = models.CharField(max_length=255, blank=True, help_text="Provider message ID")
    error_message = models.TextField(blank=True)
    retry_count = models.PositiveIntegerField(default=0)
    next_retry_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Delivery {self.channel} for {self.notification}"


class DeadLetterQueue(BaseModel):
    delivery = models.OneToOneField(
        NotificationDelivery, on_delete=models.CASCADE, related_name="dlq_entry"
    )
    reason = models.TextField()
    failed_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"DLQ Entry for Delivery {self.delivery.id}"
