from django.db import models

from common.models import BaseModel


class Estimate(BaseModel):
    estimate_number = models.CharField(max_length=100, unique=True)
    client = models.ForeignKey(
        "crm.Company", on_delete=models.SET_NULL, null=True, blank=True, related_name="estimates"
    )
    project = models.ForeignKey(
        "projects.Project",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="estimates",
    )
    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)

    issue_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)

    subtotal = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    discount_total = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    tax_total = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    total = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)

    status = models.CharField(
        max_length=50,
        choices=(
            ("draft", "Draft"),
            ("sent", "Sent"),
            ("accepted", "Accepted"),
            ("rejected", "Rejected"),
            ("converted_to_invoice", "Converted to Invoice"),
        ),
        default="draft",
    )

    notes = models.TextField(blank=True)
    terms = models.TextField(blank=True)

    def __str__(self):
        return f"Estimate {self.estimate_number}"


class EstimateItem(BaseModel):
    estimate = models.ForeignKey(Estimate, on_delete=models.CASCADE, related_name="items")
    description = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1.0)
    unit_price = models.DecimalField(max_digits=15, decimal_places=2)
    tax = models.ForeignKey("finance.Tax", on_delete=models.SET_NULL, null=True, blank=True)
    total = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"{self.description} (x{self.quantity})"
