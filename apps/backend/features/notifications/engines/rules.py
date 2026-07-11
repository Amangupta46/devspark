import logging
from typing import Any, Dict

from features.notifications.models import NotificationPreference

logger = logging.getLogger(__name__)


class NotificationRulesEngine:
    """
    Evaluates preferences and priority to determine if a notification should be sent instantly,
    digested, or skipped (muted), and which channels should be used.
    """

    @staticmethod
    def evaluate(user, category, priority) -> Dict[str, Any]:
        result = {"action": "instant", "channels": []}  # instant, digest, mute

        # Retrieve user preference for this category
        preference = NotificationPreference.objects.filter(user=user, category=category).first()

        if not preference:
            # Fallback defaults based on priority weight
            if priority and priority.weight >= 50:
                result["action"] = "instant"
                result["channels"] = ["email", "in_app"]
            else:
                result["action"] = "instant"
                result["channels"] = ["in_app"]
            return result

        if preference.delivery_mode == "muted":
            result["action"] = "mute"
            return result

        if preference.delivery_mode in [
            "hourly_digest",
            "daily_digest",
            "weekly_digest",
            "monthly_digest",
        ]:
            result["action"] = preference.delivery_mode
            return result

        result["action"] = "instant"
        if preference.email_enabled:
            result["channels"].append("email")
        if preference.in_app_enabled:
            result["channels"].append("in_app")
        if preference.sms_enabled:
            result["channels"].append("sms")
        if preference.push_enabled:
            result["channels"].append("push")
        if preference.whatsapp_enabled:
            result["channels"].append("whatsapp")

        return result


rules_engine = NotificationRulesEngine()
