from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseGateway(ABC):
    """
    Abstract base class for payment gateways.
    Enforces a common interface for all supported payment providers.
    """

    @abstractmethod
    def create_payment_intent(self, amount: float, currency: str, **kwargs) -> Dict[str, Any]:
        """
        Create a payment intent on the gateway.
        Should return a dictionary containing the intent ID and any client secret needed.
        """
        pass

    @abstractmethod
    def capture_payment(self, intent_id: str, **kwargs) -> Dict[str, Any]:
        """
        Capture a previously authorized payment.
        """
        pass

    @abstractmethod
    def refund_payment(self, payment_id: str, amount: float = None, **kwargs) -> Dict[str, Any]:
        """
        Refund a payment.
        """
        pass

    @abstractmethod
    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """
        Verify the signature of an incoming webhook payload.
        """
        pass
