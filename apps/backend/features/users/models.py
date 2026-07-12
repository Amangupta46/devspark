from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone as django_timezone
from django.utils.translation import gettext_lazy as _

from common.models import BaseModel

from .managers import CustomUserManager


class Role(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Permission(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class RolePermission(BaseModel):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="permissions")
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, related_name="roles")

    class Meta:
        unique_together = ("role", "permission")


class CustomUser(AbstractBaseUser, PermissionsMixin, BaseModel):
    # Core Identity
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(_("username"), max_length=150, unique=True, null=True, blank=True)
    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    phone = models.CharField(_("phone number"), max_length=20, blank=True)
    profile_image = models.ImageField(upload_to="avatars/", null=True, blank=True)
    company_name = models.CharField(max_length=255, blank=True)

    # Geography/Demographics
    timezone = models.CharField(max_length=100, default="UTC")
    country = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    pincode = models.CharField(max_length=20, blank=True)

    # Bio/Links
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)

    # Security/Status
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    two_factor_enabled = models.BooleanField(default=False)

    status = models.CharField(
        max_length=50,
        choices=[
            ("active", "Active"),
            ("inactive", "Inactive"),
            ("locked", "Locked"),
            ("banned", "Banned"),
        ],
        default="active",
    )

    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    last_activity = models.DateTimeField(null=True, blank=True)

    # Standard Django auth fields
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=django_timezone.now)

    # Custom Role mapping (One user can have multiple roles in true RBAC, or a primary role)
    roles = models.ManyToManyField(Role, related_name="users", blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()  # type: ignore[misc,assignment]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.email


class UserSettings(BaseModel):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="settings")
    theme = models.CharField(max_length=20, default="system")
    locale = models.CharField(max_length=10, default="en")

    def __str__(self):
        return f"Settings for {self.user.email}"


class NotificationPreference(BaseModel):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="user_notification_preferences"
    )
    email_marketing = models.BooleanField(default=False)
    email_security = models.BooleanField(default=True)
    email_updates = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)

    def __str__(self):
        return f"Notification Preferences for {self.user.email}"


class ActiveSession(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="sessions")
    token_jti = models.CharField(max_length=255, unique=True)
    device_info = models.CharField(max_length=255, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"Session for {self.user.email} from {self.ip_address}"


class AuditLog(BaseModel):
    user = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, related_name="audit_logs"
    )
    action = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.user.email if self.user else 'System'} performed {self.action} at {self.created_at}"


class PersonalAccessToken(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="pats")
    name = models.CharField(max_length=100)
    token_hash = models.CharField(max_length=255, unique=True)
    scopes = models.JSONField(default=list, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    last_used_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"PAT {self.name} for {self.user.email}"


class LoginAttempt(BaseModel):
    email = models.EmailField(db_index=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    successful = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Login attempt for {self.email} from {self.ip_address} (Success: {self.successful})"


class PasswordHistory(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="password_history")
    password_hash = models.CharField(max_length=128)

    def __str__(self):
        return f"Password history for {self.user.email} at {self.created_at}"
