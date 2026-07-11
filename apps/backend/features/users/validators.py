import re

from django.contrib.auth.password_validation import validate_password as django_validate_password
from django.core.exceptions import ValidationError


def validate_strong_password(password: str) -> None:
    """
    Validates password strength:
    - At least 8 characters
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one number
    - Contains at least one special character
    """
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long.")

    if not re.search(r"[A-Z]", password):
        raise ValidationError("Password must contain at least one uppercase letter.")

    if not re.search(r"[a-z]", password):
        raise ValidationError("Password must contain at least one lowercase letter.")

    if not re.search(r"[0-9]", password):
        raise ValidationError("Password must contain at least one number.")

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise ValidationError("Password must contain at least one special character.")

    # Also run standard Django validators
    django_validate_password(password)


def validate_no_password_reuse(user, new_password):
    """
    Ensures the user is not reusing recent passwords.
    """
    from django.contrib.auth.hashers import check_password

    from .models import PasswordHistory

    recent_passwords = PasswordHistory.objects.filter(user=user).order_by("-created_at")[:5]
    for history in recent_passwords:
        if check_password(new_password, history.password_hash):
            raise ValidationError("You cannot reuse a recently used password.")
