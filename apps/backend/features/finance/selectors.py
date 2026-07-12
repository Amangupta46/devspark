from django.db.models import F, Q, Sum
from django.utils import timezone

from .models.accounting import JournalEntry
from .models.core import Coupon, Currency, PaymentGatewayConfig, Tax
from .models.estimate import Estimate
from .models.expense import Vendor
from .models.invoice import Invoice
from .models.milestone import BillingMilestone


class FinanceSelectors:
    @staticmethod
    def get_base_currency():
        return Currency.objects.filter(is_base=True).first()

    @staticmethod
    def get_active_taxes():
        return Tax.objects.filter(is_active=True)

    @staticmethod
    def get_valid_coupons():
        return (
            Coupon.objects.filter(is_active=True)
            .filter(Q(expiry_date__isnull=True) | Q(expiry_date__gt=timezone.now()))
            .exclude(usage_limit__isnull=False, used_count__gte=F("usage_limit"))
        )

    @staticmethod
    def get_active_gateways():
        return PaymentGatewayConfig.objects.filter(is_active=True)

    @staticmethod
    def get_vendor_by_id(vendor_id: int):
        return Vendor.objects.filter(id=vendor_id, is_active=True).first()

    @staticmethod
    def get_ledger_balance(ledger_id: int):
        """
        Calculates the balance of a given ledger.
        """
        entries = JournalEntry.objects.filter(ledger_id=ledger_id, status="posted")  # type: ignore[misc]
        debits = entries.aggregate(total_debits=Sum("lines__debit_amount"))["total_debits"] or 0
        credits = entries.aggregate(total_credits=Sum("lines__credit_amount"))["total_credits"] or 0
        return debits - credits


def get_overdue_invoices():
    return Invoice.objects.filter(
        status__in=["sent", "viewed", "partially_paid"], due_date__lt=timezone.now().date()
    )


def get_invoices_pending_approval():
    return Invoice.objects.filter(status="pending_approval")


def get_client_statement(client_id: int):
    invoices = Invoice.objects.filter(client_id=client_id).order_by("-issue_date")
    estimates = Estimate.objects.filter(client_id=client_id).order_by("-issue_date")
    return {
        "invoices": invoices,
        "estimates": estimates,
        "total_outstanding": invoices.aggregate(Sum("balance"))["balance__sum"] or 0,
    }


def get_unbilled_milestones():
    return BillingMilestone.objects.filter(status="completed")
