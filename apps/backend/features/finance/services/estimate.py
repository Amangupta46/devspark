from django.db import transaction
from django.utils import timezone

from features.finance.models import Estimate, Invoice
from features.finance.services.invoice import InvoiceService
from features.finance.signals import estimate_accepted


class EstimateService:
    @staticmethod
    def accept_estimate(estimate_id: int) -> Estimate:
        estimate = Estimate.objects.get(id=estimate_id)
        estimate.status = "accepted"
        estimate.save()
        estimate_accepted.send(sender=Estimate, estimate=estimate)
        return estimate

    @staticmethod
    def reject_estimate(estimate_id: int) -> Estimate:
        estimate = Estimate.objects.get(id=estimate_id)
        estimate.status = "rejected"
        estimate.save()
        return estimate

    @staticmethod
    @transaction.atomic
    def convert_to_invoice(estimate_id: int) -> Invoice:
        estimate = Estimate.objects.get(id=estimate_id)

        # Create Invoice
        invoice = InvoiceService.create_invoice(
            client_id=estimate.client_id,
            project_id=estimate.project_id,
            currency_id=estimate.currency_id,
            issue_date=timezone.now().date(),
            due_date=timezone.now().date() + timezone.timedelta(days=30),  # Default 30 days
            notes=estimate.notes,
            terms=estimate.terms,
        )

        # Copy items
        items_data = []
        for item in estimate.items.all():
            items_data.append(
                {
                    "description": item.description,
                    "quantity": item.quantity,
                    "unit_price": item.unit_price,
                    "tax_id": item.tax_id,
                }
            )

        InvoiceService.add_invoice_items(invoice.id, items_data)

        estimate.status = "converted_to_invoice"
        estimate.save()

        return invoice
