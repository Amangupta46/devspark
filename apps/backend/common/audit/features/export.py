import csv
import json
from io import StringIO


class AuditExporter:
    """
    Interface for converting AuditEntry records into downloadable streams.
    """

    @staticmethod
    def export_to_json(queryset) -> str:
        data = []
        for entry in queryset:
            data.append(
                {
                    "id": entry.id,
                    "entity_type": entry.entity_type,
                    "entity_id": entry.entity_id,
                    "action": entry.action,
                    "changes": entry.changes,
                    "user_id": entry.user_id,
                    "ip_address": entry.ip_address,
                    "correlation_id": entry.correlation_id,
                    "created_at": entry.created_at.isoformat(),
                }
            )
        return json.dumps(data, indent=2)

    @staticmethod
    def export_to_csv(queryset) -> str:
        output = StringIO()
        writer = csv.writer(output)

        # Header
        writer.writerow(
            [
                "ID",
                "Entity Type",
                "Entity ID",
                "Action",
                "User ID",
                "IP Address",
                "Correlation ID",
                "Created At",
                "Changes",
            ]
        )

        for entry in queryset:
            writer.writerow(
                [
                    entry.id,
                    entry.entity_type,
                    entry.entity_id,
                    entry.action,
                    entry.user_id,
                    entry.ip_address,
                    entry.correlation_id,
                    entry.created_at.isoformat(),
                    json.dumps(entry.changes),
                ]
            )

        return output.getvalue()
