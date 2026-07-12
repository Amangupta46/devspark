from datetime import timedelta
from decimal import Decimal
from typing import List

from django.db import transaction
from django.utils import timezone

from features.finance.models import BillingMilestone, Installment, Invoice
from features.finance.services.invoice import InvoiceService
from features.finance.signals import milestone_invoiced


class BillingService:
    @staticmethod
    @transaction.atomic
    def generate_milestone_invoice(milestone_id: int) -> Invoice:
        milestone = BillingMilestone.objects.get(id=milestone_id)

        if milestone.status in ["invoiced", "paid"]:
            raise ValueError("Milestone is already invoiced or paid.")

        # Create Invoice
        invoice = InvoiceService.create_invoice(
            client_id=(
                milestone.project.client_id if hasattr(milestone.project, "client_id") else None
            ),
            project_id=milestone.project_id,
            currency_id=milestone.currency_id,
            issue_date=timezone.now().date(),
            due_date=timezone.now().date() + timedelta(days=15),
            notes=f"Invoice for milestone: {milestone.name}",
        )

        # Add item
        InvoiceService.add_invoice_items(
            invoice.id,
            [
                {
                    "description": milestone.name,
                    "quantity": 1,
                    "unit_price": milestone.amount,
                    "tax_id": None,
                }
            ],
        )

        milestone.status = "invoiced"
        milestone.invoice = invoice
        milestone.save()

        milestone_invoiced.send(sender=BillingMilestone, milestone=milestone, invoice=invoice)

        return invoice

    @staticmethod
    @transaction.atomic
    def generate_installment_plan(invoice_id: int, percentages: List[Decimal]) -> List[Installment]:
        """
        Splits an invoice into multiple installments based on given percentages (must sum to 100).
        """
        if sum(percentages) != Decimal("100.0"):
            raise ValueError("Percentages must sum to 100.")

        invoice = Invoice.objects.get(id=invoice_id)

        # Clear existing
        invoice.installments.all().delete()

        installments = []
        base_amount = invoice.total

        for idx, pct in enumerate(percentages):
            amount = base_amount * (pct / Decimal("100.0"))
            due_date = invoice.issue_date + timedelta(days=(idx + 1) * 30)

            inst = Installment(invoice=invoice, amount=amount, due_date=due_date, status="pending")
            installments.append(inst)

        Installment.objects.bulk_create(installments)
        return list(invoice.installments.all())
