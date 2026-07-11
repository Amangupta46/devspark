from celery import shared_task
from django.utils import timezone

from features.finance.models import Payment, PaymentIntent

from .signals import payment_failed, payment_succeeded


@shared_task
def process_webhook_event(provider: str, event_data: dict):
    """
    Idempotent processing of webhook events.
    """
    if provider == "stripe":
        event_type = event_data.get("type")
        data_object = event_data.get("data", {}).get("object", {})
        intent_id = data_object.get("id")

        if event_type == "payment_intent.succeeded":
            _handle_payment_succeeded(intent_id, provider, data_object)
        elif event_type == "payment_intent.payment_failed":
            _handle_payment_failed(intent_id, provider, data_object)

    elif provider == "razorpay":
        event_type = event_data.get("event")
        payment_entity = event_data.get("payload", {}).get("payment", {}).get("entity", {})
        # Razorpay intent is usually order_id
        intent_id = payment_entity.get("order_id")

        if event_type == "order.paid":
            _handle_payment_succeeded(intent_id, provider, payment_entity)
        elif event_type == "payment.failed":
            _handle_payment_failed(intent_id, provider, payment_entity)

    elif provider == "paypal":
        event_type = event_data.get("event_type")
        resource = event_data.get("resource", {})
        intent_id = resource.get("parent_payment")

        if event_type == "PAYMENT.SALE.COMPLETED":
            _handle_payment_succeeded(intent_id, provider, resource)
        elif event_type == "PAYMENT.SALE.DENIED":
            _handle_payment_failed(intent_id, provider, resource)


def _handle_payment_succeeded(intent_id: str, provider: str, raw_data: dict):
    try:
        intent = PaymentIntent.objects.get(gateway_intent_id=intent_id)
        if intent.status == "succeeded":
            return  # Already processed

        intent.status = "succeeded"
        intent.save()

        # Create Payment record
        payment, created = Payment.objects.get_or_create(
            payment_intent=intent,
            defaults={
                "invoice": intent.invoice,
                "amount": intent.amount,
                "currency": intent.currency,
                "status": "completed",
                "paid_at": timezone.now(),
                "transaction_id": raw_data.get("id", ""),
            },
        )

        if created:
            payment_succeeded.send(sender=Payment, payment=payment)

    except PaymentIntent.DoesNotExist:
        pass


def _handle_payment_failed(intent_id: str, provider: str, raw_data: dict):
    try:
        intent = PaymentIntent.objects.get(gateway_intent_id=intent_id)
        if intent.status == "failed":
            return

        intent.status = "failed"
        intent.save()

        payment_failed.send(sender=PaymentIntent, intent=intent)

    except PaymentIntent.DoesNotExist:
        pass
