from django.db import models

from common.models import BaseModel


class Invoice(BaseModel):
    invoice_number = models.CharField(max_length=100, unique=True)
    client = models.ForeignKey(
        "crm.Company", on_delete=models.SET_NULL, null=True, blank=True, related_name="invoices"
    )
    project = models.ForeignKey(
        "projects.Project",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="invoices",
    )
    quote = models.ForeignKey(
        "quotes.Quote", on_delete=models.SET_NULL, null=True, blank=True, related_name="invoices"
    )

    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)
    exchange_rate_at_creation = models.DecimalField(max_digits=20, decimal_places=6, default=1.0)

    issue_date = models.DateField()
    due_date = models.DateField()

    subtotal = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    discount_total = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    tax_total = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    total = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)

    amount_paid = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)

    status = models.CharField(
        max_length=50,
        choices=(
            ("draft", "Draft"),
            ("pending_approval", "Pending Approval"),
            ("sent", "Sent"),
            ("viewed", "Viewed"),
            ("partially_paid", "Partially Paid"),
            ("paid", "Paid"),
            ("overdue", "Overdue"),
            ("cancelled", "Cancelled"),
            ("refunded", "Refunded"),
        ),
        default="draft",
    )

    notes = models.TextField(blank=True)
    terms = models.TextField(blank=True)

    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.client}"


class InvoiceItem(BaseModel):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="items")
    description = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1.0)
    unit_price = models.DecimalField(max_digits=15, decimal_places=2)
    tax = models.ForeignKey("finance.Tax", on_delete=models.SET_NULL, null=True, blank=True)
    total = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"{self.description} (x{self.quantity})"


class Installment(BaseModel):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="installments")
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(
        max_length=50,
        choices=(("pending", "Pending"), ("paid", "Paid"), ("overdue", "Overdue")),
        default="pending",
    )

    def __str__(self):
        return f"Installment for {self.invoice} - {self.amount}"


class CreditNote(BaseModel):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="credit_notes")
    credit_number = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    reason = models.TextField()
    date_issued = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Credit Note {self.credit_number} for {self.invoice}"


class DebitNote(BaseModel):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="debit_notes")
    debit_number = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    reason = models.TextField()
    date_issued = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Debit Note {self.debit_number} for {self.invoice}"
