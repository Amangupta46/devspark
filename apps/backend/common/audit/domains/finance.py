from ..service import AuditService


class FinanceAudit:
    DOMAIN = "finance"

    @staticmethod
    def log_invoice_created(invoice_id: str, total_amount: float):
        changes = {"total_amount": {"new": total_amount}}
        AuditService.log_action("invoice", invoice_id, "CREATED", changes=changes)

    @staticmethod
    def log_payment_received(invoice_id: str, payment_id: str, amount: float):
        changes = {"payment_id": {"new": payment_id}, "amount": {"new": amount}}
        AuditService.log_action("invoice", invoice_id, "PAYMENT_RECEIVED", changes=changes)
