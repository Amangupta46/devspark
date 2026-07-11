from typing import Any, Optional

from rest_framework.response import Response


def get_success_response(
    data: Optional[Any] = None,
    message: str = "Success",
    status_code: int = 200,
    meta: Optional[dict] = None,
) -> Response:
    """Standardized API success response formatter."""
    response_data = {
        "success": True,
        "message": message,
        "data": data,
        "errors": None,
    }
    if meta:
        response_data["meta"] = meta

    return Response(response_data, status=status_code)


def get_error_response(
    message: str = "An error occurred", errors: Optional[Any] = None, status_code: int = 400
) -> Response:
    """Standardized API error response formatter."""
    response_data = {
        "success": False,
        "message": message,
        "data": None,
        "errors": errors,
    }
    return Response(response_data, status=status_code)
