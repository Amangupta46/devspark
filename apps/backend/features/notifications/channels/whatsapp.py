import logging

from .base import BaseChannel

logger = logging.getLogger(__name__)


class WhatsAppChannel(BaseChannel):
    channel_name = "whatsapp"

    def send(self, recipient, title: str, body: str, metadata: dict | None = None) -> bool:
        # Foundation for WhatsApp delivery
        logger.info(f"Simulating WhatsApp to {recipient}: {body}")
        return True
