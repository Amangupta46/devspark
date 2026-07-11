from django.db import models

from common.models import BaseModel


class Vendor(BaseModel):
    name = models.CharField(max_length=255)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    tax_identifier = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ExpenseCategory(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Expense(BaseModel):
    vendor = models.ForeignKey(
        Vendor, on_delete=models.SET_NULL, null=True, blank=True, related_name="expenses"
    )
    category = models.ForeignKey(ExpenseCategory, on_delete=models.SET_NULL, null=True, blank=True)
    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    exchange_rate_at_expense = models.DecimalField(max_digits=20, decimal_places=6, default=1.0)

    date_incurred = models.DateField()
    description = models.TextField()
    reference_number = models.CharField(
        max_length=100, blank=True, help_text="Receipt or Invoice number from vendor"
    )

    is_billable_to_client = models.BooleanField(default=False)
    client_project = models.ForeignKey(
        "projects.Project", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"Expense {self.id} - {self.amount}"
