from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import ActivityTimeline, Lead, LeadAssignmentHistory


@receiver(pre_save, sender=Lead)
def capture_old_lead_state(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Lead.objects.get(pk=instance.pk)
            instance._old_stage = old_instance.stage
            instance._old_assignee = old_instance.assigned_to
        except Lead.DoesNotExist:
            instance._old_stage = None
            instance._old_assignee = None
    else:
        instance._old_stage = None
        instance._old_assignee = None


@receiver(post_save, sender=Lead)
def generate_lead_activity_log(sender, instance, created, **kwargs):
    if created:
        ActivityTimeline.objects.create(
            lead=instance,
            action="Lead Created",
            description=f"Lead {instance.lead_number} created.",
        )
    else:
        if hasattr(instance, "_old_stage") and instance._old_stage != instance.stage:
            ActivityTimeline.objects.create(
                lead=instance,
                action="Stage Changed",
                description=f"Stage changed from {instance._old_stage} to {instance.stage}.",
            )

        if hasattr(instance, "_old_assignee") and instance._old_assignee != instance.assigned_to:
            ActivityTimeline.objects.create(
                lead=instance,
                action="Lead Reassigned",
                description=f"Assigned to {instance.assigned_to}.",
            )
            LeadAssignmentHistory.objects.create(
                lead=instance,
                assigned_from=instance._old_assignee,
                assigned_to=instance.assigned_to,
            )
