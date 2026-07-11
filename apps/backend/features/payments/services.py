from decimal import Decimal
from typing import Any, Dict

from features.finance.models import Currency, PaymentIntent

from .gateways import GatewayFactory


class GatewayService:
    @staticmethod
    def create_intent(
        provider: str, amount: Decimal, currency_code: str, **kwargs
    ) -> PaymentIntent:
        """
        Creates a payment intent on the gateway and saves it to the database.
        """
        gateway = GatewayFactory.get_gateway(provider)

        # 1. API call to gateway
        result = gateway.create_payment_intent(float(amount), currency_code, **kwargs)

        # 2. Find or create Currency (simplified)
        currency, _ = Currency.objects.get_or_create(
            code=currency_code.upper(), defaults={"name": currency_code, "symbol": currency_code}
        )

        # 3. Save to DB
        intent = PaymentIntent.objects.create(
            amount=amount,
            currency=currency,
            gateway_intent_id=result.get("intent_id"),
            status="requires_payment_method",
        )
        # Store client_secret securely or pass to frontend directly, usually not stored in DB, but returned
        intent.client_secret = result.get("client_secret")

        return intent

    @staticmethod
    def capture_intent(provider: str, intent_id: str, **kwargs) -> Dict[str, Any]:
        """
        Captures the intent.
        """
        gateway = GatewayFactory.get_gateway(provider)
        return gateway.capture_payment(intent_id, **kwargs)

    @staticmethod
    def refund(provider: str, payment_id: str, amount: float = None, **kwargs) -> Dict[str, Any]:
        """
        Refunds a payment.
        """
        gateway = GatewayFactory.get_gateway(provider)
        return gateway.refund_payment(payment_id, amount, **kwargs)

    @staticmethod
    def handle_webhook(provider: str, payload: bytes, signature: str) -> bool:
        """
        Verifies webhook signature. Actual processing is done via tasks.
        """
        gateway = GatewayFactory.get_gateway(provider)
        return gateway.verify_webhook_signature(payload, signature)
