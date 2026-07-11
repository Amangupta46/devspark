from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

from django.db import models


@dataclass
class AuditMetadata:
    """Metadata surrounding the audit entry."""

    correlation_id: Optional[str] = None
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    version: str = "1.0"


@dataclass
class AuditContext:
    """Contextual tracking information."""

    user_id: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    request_id: Optional[str] = None
    tenant_id: Optional[str] = None


class AuditEntry(models.Model):
    """
    Immutable Django Model storing the actual audit log.
    Can be seamlessly mirrored to ELK or MongoDB if needed via post-save signals.
    """

    class Meta:
        db_table = "common_audit_entry"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["entity_type", "entity_id"]),
            models.Index(fields=["correlation_id"]),
            models.Index(fields=["user_id"]),
        ]

    # Core Log
    entity_type = models.CharField(max_length=100)
    entity_id = models.CharField(max_length=100)
    action = models.CharField(max_length=50)  # e.g., 'CREATE', 'UPDATE', 'DELETE'
    changes = models.JSONField(default=dict, blank=True)  # {"field_name": {"old": "x", "new": "y"}}

    # Context (Extracted from AuditContext)
    user_id = models.CharField(max_length=100, null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    request_id = models.CharField(max_length=100, null=True, blank=True)
    tenant_id = models.CharField(max_length=100, null=True, blank=True)

    # Metadata (Extracted from AuditMetadata)
    correlation_id = models.CharField(max_length=100, null=True, blank=True)
    version = models.CharField(max_length=10, default="1.0")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} on {self.entity_type} {self.entity_id}"
