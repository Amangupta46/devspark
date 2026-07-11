import logging

from .base import BaseChannel

logger = logging.getLogger(__name__)


class EmailChannel(BaseChannel):
    channel_name = "email"

    def send(self, recipient, title: str, body: str, metadata: dict = None) -> bool:
        if not recipient.email:
            logger.error(f"Cannot send email to {recipient}: No email address.")
            return False

        logger.info(f"Simulating Email to {recipient.email}: {title}")
        # Integration with django.core.mail or any external provider like SendGrid
        # would happen here.
        return True
