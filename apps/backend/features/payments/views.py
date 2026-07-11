import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .services import GatewayService
from .tasks import process_webhook_event


@csrf_exempt
def stripe_webhook_view(request):
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")

    if not sig_header:
        return HttpResponse(status=400)

    is_valid = GatewayService.handle_webhook("stripe", payload, sig_header)
    if not is_valid:
        return HttpResponse(status=400)

    # Queue for celery
    event_dict = json.loads(payload)
    process_webhook_event.delay("stripe", event_dict)

    return HttpResponse(status=200)


@csrf_exempt
def razorpay_webhook_view(request):
    payload = request.body
    sig_header = request.META.get("HTTP_X_RAZORPAY_SIGNATURE")

    if not sig_header:
        return HttpResponse(status=400)

    is_valid = GatewayService.handle_webhook("razorpay", payload, sig_header)
    if not is_valid:
        return HttpResponse(status=400)

    event_dict = json.loads(payload)
    process_webhook_event.delay("razorpay", event_dict)

    return HttpResponse(status=200)


@csrf_exempt
def paypal_webhook_view(request):
    payload = request.body
    sig_header = request.META.get("HTTP_PAYPAL_TRANSMISSION_SIG")

    # Validation logic in Paypal is slightly different, but abstracting here.
    # We will pass raw payload and sig.
    is_valid = GatewayService.handle_webhook("paypal", payload, sig_header)
    if not is_valid:
        return HttpResponse(status=400)

    event_dict = json.loads(payload)
    process_webhook_event.delay("paypal", event_dict)

    return HttpResponse(status=200)
