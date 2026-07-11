from rest_framework.views import exception_handler

from common.responses import get_error_response


def custom_exception_handler(exc, context):
    """
    Custom exception handler that standardizes error responses.
    Delegates to DRF's default handler to get standard errors,
    then reformats them into our {success, message, data, errors} structure.
    """
    response = exception_handler(exc, context)

    if response is not None:
        # Standardize the error response
        message = (
            "A validation error occurred" if response.status_code == 400 else "An error occurred"
        )

        # If response.data is a dict containing 'detail', use it as message
        if isinstance(response.data, dict) and "detail" in response.data:
            message = response.data["detail"]
            errors = response.data
        else:
            errors = response.data

        return get_error_response(message=message, errors=errors, status_code=response.status_code)

    # For unhandled exceptions (500s), let Django handle them or return generic
    # You might want to log the exception here (structlog)
    return get_error_response(message="Internal Server Error", errors=str(exc), status_code=500)
