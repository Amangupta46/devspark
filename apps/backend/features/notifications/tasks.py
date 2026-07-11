import logging

from celery import shared_task

from features.notifications.events import handle_domain_event
from features.notifications.models import NotificationDelivery
from features.notifications.services import delivery_service

logger = logging.getLogger(__name__)


@shared_task(queue="default")
def process_notification_event(payload: dict):
    """
    Entry point for asynchronous domain event processing into notifications.
    """
    logger.info(f"Processing event payload: {payload.get('event_name')}")
    handle_domain_event(payload)


@shared_task(queue="email_queue")
def dispatch_delivery_task(delivery_id: int):
    """
    Asynchronously invokes the delivery service for a specific delivery channel.
    """
    try:
        delivery = NotificationDelivery.objects.get(id=delivery_id)
        if delivery.status == "pending" or delivery.status == "retrying":
            delivery_service.dispatch(delivery)
    except NotificationDelivery.DoesNotExist:
        logger.error(f"Delivery {delivery_id} not found.")


@shared_task(queue="digest_queue")
def process_hourly_digests():
    """
    Cron job triggered hourly.
    """
    # Logic to find users preferring hourly digest and trigger their digest
    pass


@shared_task(queue="digest_queue")
def process_daily_digests():
    """
    Cron job triggered daily at a specific time.
    """
    pass


@shared_task(queue="retry_queue")
def process_retries():
    """
    Cron job triggered periodically to find 'retrying' deliveries whose
    next_retry_at has passed, and dispatch them again.
    """
    from django.utils import timezone

    now = timezone.now()
    deliveries = NotificationDelivery.objects.filter(status="retrying", next_retry_at__lte=now)
    for delivery in deliveries:
        dispatch_delivery_task.delay(delivery.id)
