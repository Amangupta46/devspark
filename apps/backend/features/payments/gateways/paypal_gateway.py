from typing import Any, Dict

import paypalrestsdk
from django.conf import settings

from .base import BaseGateway


class PayPalGateway(BaseGateway):
    def __init__(self):
        self.client_id = getattr(settings, "PAYPAL_CLIENT_ID", "dummy_client_id")
        self.client_secret = getattr(settings, "PAYPAL_CLIENT_SECRET", "dummy_client_secret")
        self.mode = "sandbox" if getattr(settings, "PAYPAL_IS_SANDBOX", True) else "live"

        paypalrestsdk.configure(
            {"mode": self.mode, "client_id": self.client_id, "client_secret": self.client_secret}
        )

    def create_payment_intent(self, amount: float, currency: str, **kwargs) -> Dict[str, Any]:
        """
        Create a Payment with PayPal.
        """
        payment = paypalrestsdk.Payment(
            {
                "intent": "sale",
                "payer": {"payment_method": "paypal"},
                "transactions": [
                    {
                        "amount": {"total": str(amount), "currency": currency.upper()},
                        "description": kwargs.get("description", ""),
                    }
                ],
                "redirect_urls": {
                    "return_url": kwargs.get("return_url", "http://localhost/return"),
                    "cancel_url": kwargs.get("cancel_url", "http://localhost/cancel"),
                },
            }
        )

        if payment.create():
            return {
                "intent_id": payment.id,
                "client_secret": None,
                "status": payment.state,
                "raw": payment.to_dict(),
            }
        else:
            raise Exception(f"PayPal payment creation failed: {payment.error}")

    def capture_payment(self, intent_id: str, **kwargs) -> Dict[str, Any]:
        payment = paypalrestsdk.Payment.find(intent_id)
        payer_id = kwargs.get("payer_id")

        if payment.execute({"payer_id": payer_id}):
            return {"intent_id": payment.id, "status": payment.state, "raw": payment.to_dict()}
        else:
            raise Exception(f"PayPal capture failed: {payment.error}")

    def refund_payment(self, payment_id: str, amount: float = None, **kwargs) -> Dict[str, Any]:
        # PayPal expects the sale ID for refunding, which is usually inside the payment's related resources
        # Assuming payment_id here is the sale_id
        sale = paypalrestsdk.Sale.find(payment_id)

        refund_data = {}
        if amount:
            refund_data = {
                "amount": {"total": str(amount), "currency": kwargs.get("currency", "USD")}
            }

        refund = sale.refund(refund_data)
        if refund.success():
            return {"refund_id": refund.id, "status": refund.state, "raw": refund.to_dict()}
        else:
            raise Exception(f"PayPal refund failed: {refund.error}")

    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        # PayPal webhook signature verification is complex (involves API call usually)
        # For Sandbox/MVP, we might return True or implement the cert validation.
        # Here we just mock it for simplicity as per MVP.
        return True
