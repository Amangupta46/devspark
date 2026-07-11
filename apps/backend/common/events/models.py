import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, Optional


@dataclass
class EventMetadata:
    """Metadata surrounding an event."""

    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    correlation_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    version: str = "1.0"


@dataclass
class EventContext:
    """Contextual information about where/why the event originated."""

    user_id: Optional[str] = None
    tenant_id: Optional[str] = None
    request_id: Optional[str] = None
    module_origin: Optional[str] = None


class BaseEvent:
    """
    Base class for all domain events.
    """

    event_name: str = "base_event"

    def __init__(
        self,
        payload: Dict[str, Any],
        context: Optional[EventContext] = None,
        metadata: Optional[EventMetadata] = None,
    ):
        self.payload = payload
        self.context = context or EventContext()
        self.metadata = metadata or EventMetadata()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "event_name": self.event_name,
            "payload": self.payload,
            "context": {
                "user_id": self.context.user_id,
                "tenant_id": self.context.tenant_id,
                "request_id": self.context.request_id,
                "module_origin": self.context.module_origin,
            },
            "metadata": {
                "event_id": self.metadata.event_id,
                "correlation_id": self.metadata.correlation_id,
                "timestamp": self.metadata.timestamp,
                "version": self.metadata.version,
            },
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]):
        context_data = data.get("context", {})
        metadata_data = data.get("metadata", {})

        context = EventContext(**context_data)
        metadata = EventMetadata(**metadata_data)

        return cls(payload=data.get("payload", {}), context=context, metadata=metadata)
