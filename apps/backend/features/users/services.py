from datetime import timedelta

from django.conf import settings
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    ActiveSession,
    CustomUser,
    LoginAttempt,
    NotificationPreference,
    PasswordHistory,
    UserSettings,
)
from .validators import validate_no_password_reuse, validate_strong_password


class RegisterService:
    @staticmethod
    def execute(data: dict) -> CustomUser:
        password = data.pop("password")
        validate_strong_password(password)

        user = CustomUser.objects.create_user(password=password, **data)

        # Initialize relations
        UserSettings.objects.create(user=user)
        NotificationPreference.objects.create(user=user)
        PasswordHistory.objects.create(user=user, password_hash=user.password)

        # In a real app, fire celery task to send verification email here

        return user


class LoginService:
    MAX_FAILED_ATTEMPTS = 5
    LOCKOUT_DURATION = timedelta(minutes=15)

    @staticmethod
    def execute(email: str, password: str, request) -> dict:
        ip_address = request.META.get("REMOTE_ADDR")
        user_agent = request.META.get("HTTP_USER_AGENT", "")

        # Check lockout
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            LoginAttempt.objects.create(
                email=email, ip_address=ip_address, user_agent=user_agent, successful=False
            )
            raise ValidationError("Invalid credentials.")

        if user.status == "locked":
            # Check if lockout duration has passed
            last_failed = (
                LoginAttempt.objects.filter(email=email, successful=False)
                .order_by("-timestamp")
                .first()
            )
            if (
                last_failed
                and timezone.now() < last_failed.timestamp + LoginService.LOCKOUT_DURATION
            ):
                raise ValidationError(
                    "Account is locked due to too many failed attempts. Try again later."
                )
            else:
                user.status = "active"
                user.save(update_fields=["status"])

        user = authenticate(email=email, password=password)
        if not user:
            LoginAttempt.objects.create(
                email=email, ip_address=ip_address, user_agent=user_agent, successful=False
            )
            failed_count = LoginAttempt.objects.filter(
                email=email, successful=False, timestamp__gte=timezone.now() - timedelta(minutes=15)
            ).count()

            if failed_count >= LoginService.MAX_FAILED_ATTEMPTS:
                # Lock the account
                db_user = CustomUser.objects.get(email=email)
                db_user.status = "locked"
                db_user.save(update_fields=["status"])
                raise ValidationError("Account locked due to multiple failed login attempts.")

            raise ValidationError("Invalid credentials.")

        # Require email verification
        if not user.email_verified:
            raise ValidationError("Please verify your email before logging in.")

        # Successful login
        LoginAttempt.objects.create(
            email=email, ip_address=ip_address, user_agent=user_agent, successful=True
        )
        user.last_login_ip = ip_address
        user.last_activity = timezone.now()
        user.save(update_fields=["last_login_ip", "last_activity"])

        # Generate tokens
        refresh = RefreshToken.for_user(user)

        # Track active session
        ActiveSession.objects.create(
            user=user,
            token_jti=refresh["jti"],
            ip_address=ip_address,
            user_agent=user_agent,
            expires_at=timezone.now() + settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
        )

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user_id": str(user.id),
        }


class PasswordService:
    @staticmethod
    def change_password(user: CustomUser, old_password: str, new_password: str):
        if not user.check_password(old_password):
            raise ValidationError("Invalid old password.")

        validate_strong_password(new_password)
        validate_no_password_reuse(user, new_password)

        user.set_password(new_password)
        user.save()
        PasswordHistory.objects.create(user=user, password_hash=user.password)


class GoogleOAuthService:
    @staticmethod
    def verify_and_login(id_token: str, request) -> dict:
        # Placeholder for actual Google verify logic
        # In a real setup, use google.oauth2.id_token to verify
        # Then either get or create user, then use LoginService logic (excluding password checks) to generate tokens
        return {"access": "token", "refresh": "token"}
