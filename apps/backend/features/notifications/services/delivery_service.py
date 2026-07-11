import logging

from django.utils import timezone

from features.notifications.channels import CHANNELS
from features.notifications.engines.retry import retry_engine
from features.notifications.models import NotificationAnalytics, NotificationDelivery

logger = logging.getLogger(__name__)


class DeliveryService:
    """
    Invokes the specific channel delivery and manages state/retries.
    """

    @staticmethod
    def dispatch(delivery: NotificationDelivery):
        channel_name = delivery.channel
        channel_impl = CHANNELS.get(channel_name)

        if not channel_impl:
            logger.error(f"Unknown channel: {channel_name}")
            retry_engine.handle_failure(delivery, "Unknown channel")
            return

        notification = delivery.notification
        recipient = notification.recipient

        try:
            success = channel_impl.send(
                recipient=recipient,
                title=notification.title,
                body=notification.body,
                metadata=notification.metadata,
            )

            if success:
                delivery.status = "sent"
                delivery.save()

                # Update analytics
                analytics, _ = NotificationAnalytics.objects.get_or_create(
                    category=notification.category, channel=channel_name, date=timezone.now().date()
                )
                analytics.sent_count += 1
                analytics.save()
            else:
                retry_engine.handle_failure(delivery, "Channel send() returned False")

        except Exception as e:
            logger.error(f"Exception during dispatch to {channel_name}: {e}")
            retry_engine.handle_failure(delivery, str(e))


delivery_service = DeliveryService()
