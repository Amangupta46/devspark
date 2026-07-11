from django.db import models

from common.models import BaseModel


class PaymentIntent(BaseModel):
    invoice = models.ForeignKey(
        "finance.Invoice",
        on_delete=models.CASCADE,
        related_name="payment_intents",
        null=True,
        blank=True,
    )
    installment = models.ForeignKey(
        "finance.Installment",
        on_delete=models.CASCADE,
        related_name="payment_intents",
        null=True,
        blank=True,
    )
    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    gateway_intent_id = models.CharField(
        max_length=255, blank=True, help_text="ID from Stripe/Razorpay"
    )
    status = models.CharField(
        max_length=50,
        choices=(
            ("requires_payment_method", "Requires Payment Method"),
            ("requires_confirmation", "Requires Confirmation"),
            ("requires_action", "Requires Action"),
            ("processing", "Processing"),
            ("succeeded", "Succeeded"),
            ("canceled", "Canceled"),
            ("failed", "Failed"),
        ),
        default="requires_payment_method",
    )

    def __str__(self):
        return f"Intent {self.id} for {self.amount}"


class Payment(BaseModel):
    payment_intent = models.ForeignKey(
        PaymentIntent, on_delete=models.SET_NULL, null=True, blank=True, related_name="payments"
    )
    invoice = models.ForeignKey(
        "finance.Invoice", on_delete=models.CASCADE, related_name="payments"
    )
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)
    exchange_rate_at_payment = models.DecimalField(max_digits=20, decimal_places=6, default=1.0)

    method = models.ForeignKey("finance.PaymentMethod", on_delete=models.SET_NULL, null=True)
    gateway = models.ForeignKey(
        "finance.PaymentGatewayConfig", on_delete=models.SET_NULL, null=True, blank=True
    )

    transaction_id = models.CharField(max_length=255, blank=True)
    reference = models.CharField(max_length=255, blank=True)

    status = models.CharField(
        max_length=50,
        choices=(
            ("pending", "Pending"),
            ("completed", "Completed"),
            ("failed", "Failed"),
            ("refunded", "Refunded"),
        ),
        default="pending",
    )
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Payment {self.transaction_id or self.id} - {self.amount}"
