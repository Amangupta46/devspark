from django.db import models

from common.models import BaseModel


class NotificationAnalytics(BaseModel):
    category = models.ForeignKey("notifications.NotificationCategory", on_delete=models.CASCADE)
    channel = models.CharField(max_length=50)

    date = models.DateField()

    sent_count = models.PositiveIntegerField(default=0)
    failed_count = models.PositiveIntegerField(default=0)
    read_count = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("category", "channel", "date")

    def __str__(self):
        return f"Analytics {self.date} - {self.category.name} via {self.channel}"


class SystemHealth(BaseModel):
    metric_name = models.CharField(max_length=100, unique=True)
    metric_value = models.JSONField(default=dict)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.metric_name
