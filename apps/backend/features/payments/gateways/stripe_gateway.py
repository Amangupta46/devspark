from typing import Any, Dict

import stripe
from django.conf import settings

from .base import BaseGateway


class StripeGateway(BaseGateway):
    def __init__(self):
        # We assume stripe API keys are set in settings or passed here
        stripe.api_key = getattr(settings, "STRIPE_SECRET_KEY", "sk_test_dummy")
        self.webhook_secret = getattr(settings, "STRIPE_WEBHOOK_SECRET", "whsec_dummy")

    def create_payment_intent(self, amount: float, currency: str, **kwargs) -> Dict[str, Any]:
        """
        Create a PaymentIntent with Stripe.
        Stripe expects amount in cents.
        """
        amount_in_cents = int(amount * 100)
        intent = stripe.PaymentIntent.create(
            amount=amount_in_cents, currency=currency.lower(), metadata=kwargs.get("metadata", {})
        )
        return {
            "intent_id": intent.id,
            "client_secret": intent.client_secret,
            "status": intent.status,
            "raw": intent,
        }

    def capture_payment(self, intent_id: str, **kwargs) -> Dict[str, Any]:
        intent = stripe.PaymentIntent.capture(intent_id)
        return {"intent_id": intent.id, "status": intent.status, "raw": intent}

    def refund_payment(self, payment_id: str, amount: float = None, **kwargs) -> Dict[str, Any]:
        refund_params = {"payment_intent": payment_id}
        if amount:
            refund_params["amount"] = int(amount * 100)

        refund = stripe.Refund.create(**refund_params)
        return {"refund_id": refund.id, "status": refund.status, "raw": refund}

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        try:
            stripe.Webhook.Signature.verify_header(payload, signature, self.webhook_secret)
            return True
        except stripe.error.SignatureVerificationError:
            return False
