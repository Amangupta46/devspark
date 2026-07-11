from ..service import AuditService


class NotificationAudit:
    DOMAIN = "notification"

    @staticmethod
    def log_notification_sent(notification_id: str, channel: str, recipient: str):
        changes = {"channel": {"new": channel}, "recipient": {"new": recipient}}
        AuditService.log_action("notification", notification_id, "SENT", changes=changes)
