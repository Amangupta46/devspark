from django.db import models

from common.models import BaseModel


class SubscriptionPlan(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)
    billing_interval = models.CharField(
        max_length=50,
        choices=(("monthly", "Monthly"), ("quarterly", "Quarterly"), ("annual", "Annual")),
        default="monthly",
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.amount} {self.currency.code}/{self.billing_interval})"


class Subscription(BaseModel):
    client = models.ForeignKey(
        "crm.Company", on_delete=models.CASCADE, related_name="subscriptions"
    )
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.PROTECT)
    status = models.CharField(
        max_length=50,
        choices=(
            ("active", "Active"),
            ("past_due", "Past Due"),
            ("canceled", "Canceled"),
            ("unpaid", "Unpaid"),
        ),
        default="active",
    )
    start_date = models.DateField()
    next_billing_date = models.DateField()
    canceled_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Subscription {self.id} - {self.client}"
