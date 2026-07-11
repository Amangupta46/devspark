from django.db.models.signals import post_save
from django.dispatch import Signal, receiver

from .events import emit_journal_entry_posted
from .models.accounting import JournalEntry


@receiver(post_save, sender=JournalEntry)
def handle_journal_entry_status_change(sender, instance, created, **kwargs):
    """
    Emits a domain event when a journal entry is posted.
    """
    if not created and instance.status == "posted":
        emit_journal_entry_posted(instance.id)


# Custom signals for Business Logic Services
invoice_created = Signal()
invoice_approved = Signal()
estimate_accepted = Signal()
milestone_invoiced = Signal()
