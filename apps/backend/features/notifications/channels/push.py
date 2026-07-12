import logging

from .base import BaseChannel

logger = logging.getLogger(__name__)


class PushChannel(BaseChannel):
    channel_name = "push"

    def send(self, recipient, title: str, body: str, metadata: dict | None = None) -> bool:
        # Foundation for Mobile Push delivery (e.g. Firebase Cloud Messaging)
        logger.info(f"Simulating Push Notification to {recipient}: {title}")
        return True
