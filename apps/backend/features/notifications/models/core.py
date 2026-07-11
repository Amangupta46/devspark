from django.db import models

from common.models import BaseModel


class NotificationCategory(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    # Internal system identifier
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class NotificationPriority(BaseModel):
    level = models.CharField(
        max_length=50, unique=True, help_text="e.g., low, medium, high, urgent"
    )
    weight = models.PositiveIntegerField(default=0, help_text="Higher weight means higher priority")

    class Meta:
        ordering = ["-weight"]

    def __str__(self):
        return self.level
