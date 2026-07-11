from common.events.models import BaseEvent


class AuditEntryCreatedEvent(BaseEvent):
    """
    Fired immediately after an AuditEntry is safely saved.
    Allows decoupling for features like suspicious activity alerting or log mirroring.
    """

    event_name = "audit_entry_created"

    def __init__(self, audit_id: int, entity_type: str, action: str, **kwargs):
        payload = {"audit_id": audit_id, "entity_type": entity_type, "action": action}
        super().__init__(payload=payload, **kwargs)
