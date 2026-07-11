from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from features.users.models import AuditLog

from .models import ProjectTask, TimeLog
from .services import TimeTrackingService


@receiver([post_save, post_delete], sender=TimeLog)
def trigger_time_sync(sender, instance, **kwargs):
    if instance.task:
        TimeTrackingService.sync_actual_hours(instance.task)


@receiver(post_save, sender=ProjectTask)
def log_task_activity(sender, instance, created, **kwargs):
    action = "Task Created" if created else "Task Updated"

    AuditLog.objects.create(
        user=instance.assigned_to,
        action=action,
        metadata={
            "module": "projects",
            "project_id": instance.project.project_code,
            "task_id": instance.id,
            "description": f"{action}: {instance.title} (Status: {instance.status})",
        },
    )
