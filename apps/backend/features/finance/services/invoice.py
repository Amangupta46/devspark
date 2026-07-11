from decimal import Decimal
from typing import Any, Dict, List

from django.db import transaction

from features.finance.models import CreditNote, DebitNote, Invoice, InvoiceItem
from features.finance.signals import invoice_approved, invoice_created
from features.finance.validators import (
    validate_credit_note_amount,
    validate_invoice_status_transition,
)


class InvoiceService:
    @staticmethod
    @transaction.atomic
    def create_invoice(
        client_id: int, project_id: int, currency_id: int, issue_date, due_date, **kwargs
    ) -> Invoice:
        invoice = Invoice.objects.create(
            client_id=client_id,
            project_id=project_id,
            currency_id=currency_id,
            issue_date=issue_date,
            due_date=due_date,
            notes=kwargs.get("notes", ""),
            terms=kwargs.get("terms", ""),
            status="draft",
        )
        invoice_created.send(sender=Invoice, invoice=invoice)
        return invoice

    @staticmethod
    @transaction.atomic
    def add_invoice_items(invoice_id: int, items_data: List[Dict[str, Any]]) -> List[InvoiceItem]:
        invoice = Invoice.objects.get(id=invoice_id)
        items = []
        for data in items_data:
            qty = data.get("quantity", 1)
            price = data.get("unit_price", 0)
            item = InvoiceItem(
                invoice=invoice,
                description=data["description"],
                quantity=qty,
                unit_price=price,
                tax_id=data.get("tax_id"),
                total=Decimal(qty) * Decimal(price),
            )
            items.append(item)

        InvoiceItem.objects.bulk_create(items)
        InvoiceService.calculate_totals(invoice_id)
        return list(invoice.items.all())

    @staticmethod
    @transaction.atomic
    def calculate_totals(invoice_id: int) -> Invoice:
        invoice = Invoice.objects.get(id=invoice_id)
        items = invoice.items.all()

        subtotal = Decimal("0.0")
        tax_total = Decimal("0.0")

        for item in items:
            item_total = Decimal(item.quantity) * Decimal(item.unit_price)
            subtotal += item_total

            if item.tax:
                tax_amount = item_total * (Decimal(item.tax.rate) / Decimal("100.0"))
                tax_total += tax_amount

            item.total = item_total
            item.save()

        invoice.subtotal = subtotal
        invoice.tax_total = tax_total
        invoice.total = subtotal + tax_total - invoice.discount_total
        invoice.balance = invoice.total - invoice.amount_paid
        invoice.save()

        return invoice

    @staticmethod
    def submit_for_approval(invoice_id: int) -> Invoice:
        invoice = Invoice.objects.get(id=invoice_id)
        validate_invoice_status_transition(invoice.status, "pending_approval")
        invoice.status = "pending_approval"
        invoice.save()
        return invoice

    @staticmethod
    def approve_invoice(invoice_id: int, user) -> Invoice:
        # Permission check happens at view/API level or here if passed
        invoice = Invoice.objects.get(id=invoice_id)
        validate_invoice_status_transition(invoice.status, "sent")  # Or 'approved' if you have it
        invoice.status = "sent"  # Assuming approved means ready to send/sent
        invoice.save()
        invoice_approved.send(sender=Invoice, invoice=invoice, approved_by=user)
        return invoice

    @staticmethod
    @transaction.atomic
    def issue_credit_note(invoice_id: int, amount: Decimal, reason: str) -> CreditNote:
        invoice = Invoice.objects.get(id=invoice_id)
        validate_credit_note_amount(invoice, amount)

        cn = CreditNote.objects.create(
            invoice=invoice,
            amount=amount,
            reason=reason,
            credit_number=f"CN-{invoice.invoice_number}",
        )

        # Adjust balance
        invoice.balance -= amount
        invoice.save()
        return cn

    @staticmethod
    @transaction.atomic
    def issue_debit_note(invoice_id: int, amount: Decimal, reason: str) -> DebitNote:
        invoice = Invoice.objects.get(id=invoice_id)

        dn = DebitNote.objects.create(
            invoice=invoice,
            amount=amount,
            reason=reason,
            debit_number=f"DN-{invoice.invoice_number}",
        )

        # Adjust balance
        invoice.balance += amount
        invoice.total += amount
        invoice.save()
        return dn
