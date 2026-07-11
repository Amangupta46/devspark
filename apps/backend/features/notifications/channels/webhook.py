import logging

from .base import BaseChannel

logger = logging.getLogger(__name__)


class WebhookChannel(BaseChannel):
    channel_name = "webhook"

    def send(self, recipient, title: str, body: str, metadata: dict = None) -> bool:
        # Foundation for generic Webhooks
        webhook_url = metadata.get("webhook_url") if metadata else None
        if not webhook_url:
            logger.error("No webhook_url provided in metadata")
            return False

        logger.info(f"Simulating Webhook to {webhook_url}")
        # In real implementation:
        # try:
        #     requests.post(webhook_url, json={"title": title, "body": body})
        # except Exception as e:
        #     return False
        return True
