from decimal import Decimal

from django.db import transaction
from django.utils import timezone

from .models import Proposal, Quote


class PriceEngineService:
    @staticmethod
    def recalculate_quote_totals(quote: Quote):
        """
        Calculates subtotal, applies global discount/tax, and sets grand total.
        Called whenever QuoteItems are created, updated, or deleted.
        """
        items = quote.items.all()
        subtotal = Decimal("0.00")
        tax_total = Decimal("0.00")

        for item in items:
            # Line item calculations
            line_base = item.quantity * item.unit_price
            line_after_discount = line_base - item.discount
            item.line_total = line_after_discount + item.tax
            item.save(update_fields=["line_total"])

            subtotal += line_after_discount
            tax_total += item.tax

        quote.subtotal = subtotal
        quote.tax = tax_total

        # Apply global quote discount if any, simplified for now
        quote.grand_total = (subtotal + tax_total) - quote.discount
        quote.save(update_fields=["subtotal", "tax", "grand_total"])


class QuoteWorkflowService:
    @staticmethod
    @transaction.atomic
    def convert_to_project(quote: Quote):
        """
        Accepts a quote and triggers the interface to Project Management.
        """
        quote.status = "accepted"
        quote.save(update_fields=["status"])

        if hasattr(quote, "proposal"):
            quote.proposal.accepted_at = timezone.now()
            quote.proposal.save(update_fields=["accepted_at"])

        # Stub: Pass to Project Management (implemented in features/projects/)
        from features.crm.services import ConversionService

        if quote.lead:
            ConversionService.convert_lead_to_client_and_project(quote.lead)

        return {"status": "success", "message": "Quote accepted. Project interface triggered."}


class PDFGenerationService:
    @staticmethod
    def generate_proposal_pdf(proposal: Proposal):
        """
        Stub for generating a PDF from the proposal data (e.g. using ReportLab).
        """
        pass
