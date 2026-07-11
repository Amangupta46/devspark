from datetime import datetime
from typing import Optional

from ..models import AuditEntry


class AuditSearch:
    """
    Foundation for querying audit logs.
    """

    @staticmethod
    def search(
        user_id: Optional[str] = None,
        entity_type: Optional[str] = None,
        action: Optional[str] = None,
        ip_address: Optional[str] = None,
        correlation_id: Optional[str] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
    ):
        queryset = AuditEntry.objects.all()

        if user_id:
            queryset = queryset.filter(user_id=user_id)
        if entity_type:
            queryset = queryset.filter(entity_type=entity_type)
        if action:
            queryset = queryset.filter(action=action)
        if ip_address:
            queryset = queryset.filter(ip_address=ip_address)
        if correlation_id:
            queryset = queryset.filter(correlation_id=correlation_id)
        if start_date:
            queryset = queryset.filter(created_at__gte=start_date)
        if end_date:
            queryset = queryset.filter(created_at__lte=end_date)

        return queryset.order_by("-created_at")
