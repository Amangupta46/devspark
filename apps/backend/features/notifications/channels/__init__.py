from .email import EmailChannel
from .in_app import InAppChannel
from .push import PushChannel
from .sms import SMSChannel
from .webhook import WebhookChannel
from .whatsapp import WhatsAppChannel

CHANNELS = {
    "email": EmailChannel(),
    "in_app": InAppChannel(),
    "sms": SMSChannel(),
    "whatsapp": WhatsAppChannel(),
    "push": PushChannel(),
    "webhook": WebhookChannel(),
}

__all__ = ["CHANNELS"]
