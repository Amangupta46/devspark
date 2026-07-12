from django.conf import settings
from django.db import models

from common.models import BaseModel
from features.crm.models import Company, Contact, Lead

from .catalog import ServiceCatalog


class Quote(BaseModel):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("pending_review", "Pending Review"),
        ("sent", "Sent"),
        ("viewed", "Viewed"),
        ("negotiation", "Negotiation"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
        ("expired", "Expired"),
        ("cancelled", "Cancelled"),
    ]

    organization: models.ForeignKey = models.ForeignKey(
        "team.Organization", on_delete=models.CASCADE, null=True, blank=True, related_name="quotes"
    )
    quote_number: models.CharField = models.CharField(max_length=50, unique=True)
    lead: models.ForeignKey = models.ForeignKey(
        Lead, on_delete=models.SET_NULL, null=True, blank=True, related_name="cpq_quotes"
    )
    company: models.ForeignKey = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )
    contact: models.ForeignKey = models.ForeignKey(
        Contact, on_delete=models.SET_NULL, null=True, blank=True
    )

    status: models.CharField = models.CharField(
        max_length=30, choices=STATUS_CHOICES, default="draft"
    )
    currency: models.CharField = models.CharField(max_length=10, default="USD")

    subtotal: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )
    discount: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )
    tax: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )
    grand_total: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )

    created_by: models.ForeignKey = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="quotes_created",
    )
    approved_by: models.ForeignKey = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="quotes_approved",
    )

    expiry_date: models.DateField = models.DateField(null=True, blank=True)
    version: models.PositiveIntegerField = models.PositiveIntegerField(default=1)
    notes: models.TextField = models.TextField(blank=True)

    def __str__(self) -> str:
        return f"Quote {self.quote_number} ({self.get_status_display()})"


class QuoteItem(BaseModel):
    quote: models.ForeignKey = models.ForeignKey(
        Quote, on_delete=models.CASCADE, related_name="items"
    )
    service: models.ForeignKey = models.ForeignKey(
        ServiceCatalog, on_delete=models.SET_NULL, null=True, blank=True
    )
    custom_name: models.CharField = models.CharField(max_length=255, blank=True)
    description: models.TextField = models.TextField(blank=True)

    quantity: models.PositiveIntegerField = models.PositiveIntegerField(default=1)
    unit_price: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2
    )
    discount: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )
    tax: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )
    line_total: models.DecimalField = models.DecimalField(
        max_digits=12, decimal_places=2, default=0.00
    )

    sort_order: models.PositiveIntegerField = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self) -> str:
        return f"{self.custom_name or self.service.name} x {self.quantity}"
