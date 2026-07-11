import hashlib
import hmac
from typing import Any, Dict

import razorpay
from django.conf import settings

from .base import BaseGateway


class RazorpayGateway(BaseGateway):
    def __init__(self):
        self.key_id = getattr(settings, "RAZORPAY_KEY_ID", "rzp_test_dummy")
        self.key_secret = getattr(settings, "RAZORPAY_KEY_SECRET", "dummy_secret")
        self.webhook_secret = getattr(settings, "RAZORPAY_WEBHOOK_SECRET", "whsec_dummy")
        self.client = razorpay.Client(auth=(self.key_id, self.key_secret))

    def create_payment_intent(self, amount: float, currency: str, **kwargs) -> Dict[str, Any]:
        """
        Create an Order with Razorpay.
        Amount is in subunits (paise for INR).
        """
        amount_in_subunits = int(amount * 100)
        data = {
            "amount": amount_in_subunits,
            "currency": currency.upper(),
            "receipt": kwargs.get("receipt", ""),
            "notes": kwargs.get("metadata", {}),
        }
        order = self.client.order.create(data=data)

        return {
            "intent_id": order["id"],
            "client_secret": None,  # Razorpay uses order_id on frontend, no explicit client secret
            "status": order["status"],
            "raw": order,
        }

    def capture_payment(self, intent_id: str, **kwargs) -> Dict[str, Any]:
        # In Razorpay, intent_id here is usually the payment_id from the frontend
        amount = kwargs.get("amount")
        if amount:
            amount = int(amount * 100)
            payment = self.client.payment.capture(intent_id, amount)
        else:
            payment = self.client.payment.fetch(intent_id)

        return {"intent_id": payment["id"], "status": payment["status"], "raw": payment}

    def refund_payment(self, payment_id: str, amount: float = None, **kwargs) -> Dict[str, Any]:
        data = {}
        if amount:
            data["amount"] = int(amount * 100)

        refund = self.client.payment.refund(payment_id, data)
        return {"refund_id": refund["id"], "status": refund["status"], "raw": refund}

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        try:
            expected_signature = hmac.new(
                bytes(self.webhook_secret, "utf-8"), msg=payload, digestmod=hashlib.sha256
            ).hexdigest()
            return hmac.compare_digest(expected_signature, signature)
        except Exception:
            return False
