from .base import BaseGateway
from .paypal_gateway import PayPalGateway
from .razorpay_gateway import RazorpayGateway
from .stripe_gateway import StripeGateway


class GatewayFactory:
    """
    Factory class to instantiate the appropriate payment gateway strategy.
    """

    _gateways = {
        "stripe": StripeGateway,
        "razorpay": RazorpayGateway,
        "paypal": PayPalGateway,
    }

    @classmethod
    def get_gateway(cls, provider_name: str) -> BaseGateway:
        """
        Return an instance of the requested gateway provider.
        """
        gateway_class = cls._gateways.get(provider_name.lower())
        if not gateway_class:
            raise ValueError(f"Unsupported payment gateway provider: {provider_name}")
        return gateway_class()  # type: ignore[abstract]
