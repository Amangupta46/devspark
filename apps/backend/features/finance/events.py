from common.events import bus
from common.events.models import BaseEvent


class FinanceEvent(BaseEvent):
    def __init__(self, name: str, payload: dict):
        self.event_name = name
        super().__init__(payload)


# Define Finance Domain Event Names
INVOICE_FINALIZED = "invoice_finalized"
PAYMENT_RECEIVED = "payment_received"
PAYMENT_FAILED = "payment_failed"
REFUND_ISSUED = "refund_issued"
EXPENSE_LOGGED = "expense_logged"
JOURNAL_ENTRY_POSTED = "journal_entry_posted"


def emit_invoice_finalized(invoice_id: int):
    bus.publish(FinanceEvent(INVOICE_FINALIZED, {"invoice_id": invoice_id}))


def emit_payment_received(payment_id: int):
    bus.publish(FinanceEvent(PAYMENT_RECEIVED, {"payment_id": payment_id}))


def emit_payment_failed(payment_id: int, reason: str):
    bus.publish(FinanceEvent(PAYMENT_FAILED, {"payment_id": payment_id, "reason": reason}))


def emit_refund_issued(refund_id: int):
    bus.publish(FinanceEvent(REFUND_ISSUED, {"refund_id": refund_id}))


def emit_expense_logged(expense_id: int):
    bus.publish(FinanceEvent(EXPENSE_LOGGED, {"expense_id": expense_id}))


def emit_journal_entry_posted(entry_id: int):
    bus.publish(FinanceEvent(JOURNAL_ENTRY_POSTED, {"entry_id": entry_id}))
