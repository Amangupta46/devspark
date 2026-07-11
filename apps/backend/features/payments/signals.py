from django.dispatch import Signal

# Sent when a payment intent is fully successfully paid and recorded as a Payment
payment_succeeded = Signal()

# Sent when a payment fails
payment_failed = Signal()

# Sent when a refund is fully processed
refund_processed = Signal()
