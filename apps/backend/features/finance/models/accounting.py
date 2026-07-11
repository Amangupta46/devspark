from django.db import models

from common.models import BaseModel


class ChartOfAccounts(BaseModel):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    account_type = models.CharField(
        max_length=50,
        choices=(
            ("asset", "Asset"),
            ("liability", "Liability"),
            ("equity", "Equity"),
            ("revenue", "Revenue"),
            ("expense", "Expense"),
        ),
    )
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} - {self.name}"


class Ledger(BaseModel):
    name = models.CharField(max_length=255)
    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class JournalEntry(BaseModel):
    ledger = models.ForeignKey(Ledger, on_delete=models.CASCADE, related_name="journal_entries")
    date = models.DateField()
    reference = models.CharField(
        max_length=255, blank=True, help_text="Related invoice or payment reference"
    )
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=50,
        choices=(("draft", "Draft"), ("posted", "Posted"), ("voided", "Voided")),
        default="draft",
    )

    def __str__(self):
        return f"Journal Entry {self.id} - {self.date}"


class JournalEntryLine(BaseModel):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="lines")
    account = models.ForeignKey(ChartOfAccounts, on_delete=models.PROTECT)
    description = models.CharField(max_length=255, blank=True)
    debit_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    credit_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)

    def __str__(self):
        return f"Line for {self.journal_entry} - {self.account}"
