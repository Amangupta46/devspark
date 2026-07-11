import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_phone_number(value):
    """
    Validates a phone number using a basic regex.
    """
    phone_regex = re.compile(r"^\+?1?\d{9,15}$")
    if not phone_regex.match(value):
        raise ValidationError(
            _("%(value)s is not a valid phone number."),
            params={"value": value},
        )
