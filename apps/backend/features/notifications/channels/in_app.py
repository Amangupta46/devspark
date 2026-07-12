import logging

from .base import BaseChannel

logger = logging.getLogger(__name__)


class InAppChannel(BaseChannel):
    channel_name = "in_app"

    def send(self, recipient, title: str, body: str, metadata: dict | None = None) -> bool:
        # In-App is technically just persisting the Notification in the DB,
        # which is already done upstream. This channel might push to a websocket
        # or do nothing if the frontend relies on polling the API.
        logger.info(f"In-App notification ready for {recipient.id}")

        # Future: Push to Redis Pub/Sub for WebSockets here
        # redis_client.publish(f"user_{recipient.id}", json.dumps({'title': title}))

        return True
