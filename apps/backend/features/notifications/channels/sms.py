import logging

from .base import BaseChannel

logger = logging.getLogger(__name__)


class SMSChannel(BaseChannel):
    channel_name = "sms"

    def send(self, recipient, title: str, body: str, metadata: dict = None) -> bool:
        # Foundation for SMS delivery (e.g. Twilio)
        logger.info(f"Simulating SMS to {recipient}: {body}")
        return True
