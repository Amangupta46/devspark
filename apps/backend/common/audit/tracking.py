import threading
import uuid

from .models import AuditContext, AuditMetadata

# Thread-local storage to hold request data
_thread_locals = threading.local()


class RequestTracker:
    """
    Utility to capture and retrieve context across the request lifecycle.
    In a real implementation, a Django Middleware would populate this.
    """

    @staticmethod
    def set_current_request(request):
        _thread_locals.request = request

        # Ensure correlation ID exists
        if not getattr(request, "correlation_id", None):
            request.correlation_id = str(uuid.uuid4())

        if not getattr(request, "request_id", None):
            request.request_id = str(uuid.uuid4())

    @staticmethod
    def get_current_request():
        return getattr(_thread_locals, "request", None)

    @staticmethod
    def get_audit_context() -> AuditContext:
        request = RequestTracker.get_current_request()
        if not request:
            return AuditContext()

        # Extract IP (Handle reverse proxies if needed)
        ip = request.META.get("HTTP_X_FORWARDED_FOR")
        if ip:
            ip = ip.split(",")[0].strip()
        else:
            ip = request.META.get("REMOTE_ADDR")

        user_id = (
            str(request.user.id)
            if hasattr(request, "user") and request.user.is_authenticated
            else None
        )
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        return AuditContext(
            user_id=user_id,
            ip_address=ip,
            user_agent=user_agent,
            request_id=getattr(request, "request_id", None),
            tenant_id=getattr(request, "tenant_id", None),  # If multi-tenant
        )

    @staticmethod
    def get_audit_metadata() -> AuditMetadata:
        request = RequestTracker.get_current_request()
        if not request:
            return AuditMetadata(correlation_id=str(uuid.uuid4()))

        return AuditMetadata(correlation_id=getattr(request, "correlation_id", None))
