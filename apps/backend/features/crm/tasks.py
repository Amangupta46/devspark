from celery import shared_task
from django.utils import timezone

from .models import FollowUp


@shared_task
def sweep_and_send_reminders():
    """
    Reminder Engine Abstraction:
    Sweeps for pending follow-ups that are due,
    dispatches emails/whatsapp based on preferences,
    and marks them completed or processed.
    """
    now = timezone.now()
    due_followups = FollowUp.objects.filter(status="pending", scheduled_date__lte=now)

    for followup in due_followups:
        # Dispatch to notification infrastructure (stubbed)
        if followup.notify_email:
            pass  # Send email
        if followup.notify_whatsapp:
            pass  # Send whatsapp

        followup.status = "completed"
        followup.save(update_fields=["status"])
