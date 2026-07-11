from decimal import Decimal

from django.core.exceptions import ValidationError


class FinanceValidators:
    @staticmethod
    def validate_journal_entry_balance(lines):
        """
        Validates that the debits and credits in a journal entry balance out.
        """
        total_debit = sum(line.debit_amount for line in lines)
        total_credit = sum(line.credit_amount for line in lines)
        if total_debit != total_credit:
            raise ValidationError(
                f"Journal Entry unbalanced: Debits ({total_debit}) != Credits ({total_credit})"
            )

    @staticmethod
    def validate_positive_amount(amount):
        """
        Validates that a monetary amount is strictly positive.
        """
        if amount <= 0:
            raise ValidationError("Amount must be strictly positive.")

    @staticmethod
    def validate_active_currency(currency):
        """
        Ensures the given currency is currently active or supported.
        """
        if not currency.is_base and getattr(currency, "is_active", True) is False:
            raise ValidationError("Selected currency is inactive.")


def validate_invoice_status_transition(current_status: str, new_status: str):
    valid_transitions = {
        "draft": ["pending_approval", "sent", "cancelled"],
        "pending_approval": ["sent", "draft", "cancelled"],
        "sent": ["viewed", "partially_paid", "paid", "overdue", "cancelled"],
        "viewed": ["partially_paid", "paid", "overdue", "cancelled"],
        "partially_paid": ["paid", "overdue"],
        "paid": ["refunded"],
        "overdue": ["partially_paid", "paid", "cancelled"],
        "cancelled": [],
        "refunded": [],
    }
    allowed = valid_transitions.get(current_status, [])
    if new_status not in allowed:
        raise ValidationError(
            f"Invalid status transition from '{current_status}' to '{new_status}'."
        )


def validate_credit_note_amount(invoice, amount: Decimal):
    if amount <= Decimal("0.0"):
        raise ValidationError("Credit note amount must be positive.")
    if amount > invoice.total:
        raise ValidationError("Credit note amount cannot exceed the invoice total.")


def validate_milestone_completion(milestone):
    if milestone.status != "completed":
        raise ValidationError("Milestone must be 'completed' before it can be invoiced.")
