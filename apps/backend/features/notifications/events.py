import logging

from features.notifications.engines import resolver, rules_engine
from features.notifications.models import (
    Notification,
    NotificationCategory,
    NotificationDelivery,
    NotificationPriority,
)
from features.notifications.services import delivery_service, template_service

logger = logging.getLogger(__name__)


def handle_domain_event(payload: dict):
    """
    Generic handler for domain events bridging into the Notification system.
    """
    event_name = payload.get("event_name")
    event_data = payload.get("payload", {})

    logger.info(f"Notifications received domain event: {event_name}")

    # 1. Resolve Recipients
    recipients = resolver.resolve(event_data)

    # Mocking categories and priorities for foundations
    category, _ = NotificationCategory.objects.get_or_create(
        slug="system", defaults={"name": "System"}
    )
    priority, _ = NotificationPriority.objects.get_or_create(
        level="medium", defaults={"weight": 50}
    )

    for recipient in recipients:
        # 2. Evaluate Rules
        rules_decision = rules_engine.evaluate(recipient, category, priority)

        if rules_decision["action"] == "mute":
            continue

        # 3. Create Notification
        # Render template
        rendered = template_service.render(
            template_name=event_name, channel="in_app", language="en", context_dict=event_data
        )

        notification = Notification.objects.create(
            recipient=recipient,
            category=category,
            priority=priority,
            title=rendered["title"] or f"New {event_name}",
            body=rendered["body"] or "Event occurred.",
            metadata=event_data,
        )

        # 4. Handle Digest or Instant
        if rules_decision["action"] in [
            "hourly_digest",
            "daily_digest",
            "weekly_digest",
            "monthly_digest",
        ]:
            # Create a pending delivery for digest
            NotificationDelivery.objects.create(
                notification=notification, channel="email", status="digest_pending"
            )
        else:
            # Instant delivery for configured channels
            for channel_name in rules_decision["channels"]:
                delivery = NotificationDelivery.objects.create(
                    notification=notification, channel=channel_name, status="pending"
                )
                # In production, dispatch would be an async Celery call:
                # dispatch_delivery_task.delay(delivery.id)
                delivery_service.dispatch(delivery)


# Example Registrations
# registry.subscribe("lead_created", handle_domain_event)
# registry.subscribe("quote_sent", handle_domain_event)
# registry.subscribe("project_created", handle_domain_event)
