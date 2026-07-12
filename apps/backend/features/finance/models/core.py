from django.db import models

from common.models import BaseModel


class Currency(BaseModel):
    code = models.CharField(max_length=3, unique=True, help_text="e.g., USD, EUR, INR")
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=10)
    exchange_rate_to_base = models.DecimalField(max_digits=20, decimal_places=6, default=1.0)
    is_base = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.code} - {self.name}"


class Tax(BaseModel):
    name = models.CharField(max_length=100, help_text="e.g., GST, VAT")
    rate = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage rate")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.rate}%)"


class Coupon(BaseModel):
    code = models.CharField(max_length=50, unique=True)
    discount_type = models.CharField(
        max_length=20, choices=(("percentage", "Percentage"), ("fixed", "Fixed Amount"))
    )
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    expiry_date = models.DateTimeField(null=True, blank=True)
    usage_limit = models.PositiveIntegerField(null=True, blank=True)
    used_count = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.code


class Refund(BaseModel):
    payment = models.ForeignKey("finance.Payment", on_delete=models.CASCADE, related_name="refunds")  # type: ignore[misc]
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    reason = models.TextField()
    is_full_refund = models.BooleanField(default=False)
    status = models.CharField(
        max_length=50,
        choices=(
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
            ("processed", "Processed"),
        ),
        default="pending",
    )
    approved_by = models.ForeignKey(
        "users.CustomUser", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"Refund for {self.payment} - {self.amount}"


class PaymentMethod(BaseModel):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class PaymentGatewayConfig(BaseModel):
    gateway_name = models.CharField(max_length=100, unique=True, help_text="e.g., stripe, razorpay")
    is_active = models.BooleanField(default=False)
    is_sandbox = models.BooleanField(default=True)
    credentials = models.JSONField(
        default=dict, blank=True, help_text="Encrypted or secure gateway credentials"
    )

    def __str__(self):
        return self.gateway_name
