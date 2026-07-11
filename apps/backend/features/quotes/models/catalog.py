from django.db import models

from common.models import BaseModel


class ServiceCatalog(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=12, decimal_places=2)
    min_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    max_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    estimated_duration_days = models.IntegerField(default=0)
    category = models.CharField(max_length=100, blank=True)
    tax_rate = models.DecimalField(
        max_digits=5, decimal_places=2, default=0.00, help_text="Tax percentage"
    )
    discount_allowed = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} (${self.base_price})"
