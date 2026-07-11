from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import AuditLog, CustomUser


@receiver(post_save, sender=CustomUser)
def log_user_creation(sender, instance, created, **kwargs):
    if created:
        AuditLog.objects.create(
            user=instance, action="User Account Created", metadata={"email": instance.email}
        )
