from typing import Any, Dict, Optional

from common.events.bus import bus

from .models import AuditEntry
from .tracking import RequestTracker


class AuditService:
    """
    Core service to log and retrieve audit records securely.
    """

    @staticmethod
    def log_action(
        entity_type: str,
        entity_id: str,
        action: str,
        changes: Optional[Dict[str, Any]] = None,
        user_id: Optional[str] = None,
    ) -> AuditEntry:
        """
        Creates an immutable audit record.
        Automatically attaches Context and Metadata from the current thread if available.
        """
        context = RequestTracker.get_audit_context()
        metadata = RequestTracker.get_audit_metadata()

        # Override user_id if explicitly provided (e.g. background tasks acting on behalf of a user)
        effective_user_id = user_id or context.user_id

        entry = AuditEntry.objects.create(  # type: ignore[attr-defined]
            entity_type=entity_type,
            entity_id=str(entity_id),
            action=action.upper(),
            changes=changes or {},
            user_id=effective_user_id,
            ip_address=context.ip_address,
            user_agent=context.user_agent,
            request_id=context.request_id,
            tenant_id=context.tenant_id,
            correlation_id=metadata.correlation_id,
            version=metadata.version,
        )

        # Emit an event for downstream processing (e.g., triggering alerts on suspicious activity)
        from .events import AuditEntryCreatedEvent

        bus.publish(
            AuditEntryCreatedEvent(audit_id=entry.id, entity_type=entity_type, action=action),
            run_async=True,
        )

        return entry

    @staticmethod
    def get_audit_trail(entity_type: str, entity_id: str):
        """
        Retrieves the chronological audit history for a specific entity.
        """
        return AuditEntry.objects.filter(  # type: ignore[attr-defined]
            entity_type=entity_type, entity_id=str(entity_id)
        ).order_by("-created_at")
