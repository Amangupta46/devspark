import logging
from datetime import timedelta

from django.utils import timezone

from features.notifications.models import DeadLetterQueue, NotificationDelivery

logger = logging.getLogger(__name__)


class RetryEngine:
    """
    Handles exponential backoff for failed deliveries and moves them to DLQ
    if max retries are exceeded.
    """

    MAX_RETRIES = 5

    @staticmethod
    def calculate_next_retry(retry_count: int) -> timezone.datetime:
        # Exponential backoff: 2^retry_count minutes
        minutes = 2**retry_count
        return timezone.now() + timedelta(minutes=minutes)

    @staticmethod
    def handle_failure(delivery: NotificationDelivery, error_message: str):
        delivery.error_message = error_message

        if delivery.retry_count >= RetryEngine.MAX_RETRIES:
            logger.error(f"Max retries exceeded for delivery {delivery.id}. Moving to DLQ.")
            delivery.status = "failed"
            delivery.save()

            DeadLetterQueue.objects.create(delivery=delivery, reason=error_message)
        else:
            delivery.retry_count += 1
            delivery.next_retry_at = RetryEngine.calculate_next_retry(delivery.retry_count)
            delivery.status = "retrying"
            delivery.save()
            logger.info(
                f"Scheduled retry {delivery.retry_count} for delivery {delivery.id} at {delivery.next_retry_at}"
            )


retry_engine = RetryEngine()
