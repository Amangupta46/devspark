from datetime import timedelta

from django.utils import timezone

from ..models import AuditEntry


class RetentionPolicyManager:
    """
    Manages the lifecycle and purging of old audit logs.
    """

    DEFAULT_RETENTION_DAYS = 365

    # Domain-specific overrides
    POLICIES = {
        "finance": 2555,  # 7 years
        "user": 365,  # 1 year
        "crm": 365,  # 1 year
        "project": 180,  # 6 months
        "notification": 30,  # 1 month
    }

    @classmethod
    def get_retention_days(cls, domain: str) -> int:
        return cls.POLICIES.get(domain, cls.DEFAULT_RETENTION_DAYS)

    @classmethod
    def purge_expired_logs(cls):
        """
        Deletes logs that have exceeded their retention period.
        In a production setting, this should be a scheduled Celery task.
        """
        now = timezone.now()
        deleted_count = 0

        for domain, days in cls.POLICIES.items():
            cutoff_date = now - timedelta(days=days)
            count, _ = AuditEntry.objects.filter(
                entity_type=domain, created_at__lt=cutoff_date
            ).delete()
            deleted_count += count

        # Catch-all for undefined domains using default policy
        cutoff_date = now - timedelta(days=cls.DEFAULT_RETENTION_DAYS)
        count, _ = (
            AuditEntry.objects.exclude(entity_type__in=cls.POLICIES.keys())
            .filter(created_at__lt=cutoff_date)
            .delete()
        )

        deleted_count += count
        return deleted_count
