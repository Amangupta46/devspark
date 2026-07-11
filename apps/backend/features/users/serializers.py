from rest_framework import serializers

from .models import ActiveSession, CustomUser


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "email", "password", "company_name"]


class ProfileSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "profile_image",
            "company_name",
            "timezone",
            "country",
            "state",
            "city",
            "address",
            "pincode",
            "bio",
            "website",
            "linkedin",
            "github",
            "portfolio",
            "email_verified",
            "phone_verified",
            "two_factor_enabled",
            "roles",
            "status",
            "last_login_ip",
            "last_activity",
        ]
        read_only_fields = [
            "id",
            "email",
            "email_verified",
            "phone_verified",
            "roles",
            "status",
            "last_login_ip",
            "last_activity",
        ]

    def get_roles(self, obj):
        return [role.name for role in obj.roles.all()]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    uidb64 = serializers.CharField()
    new_password = serializers.CharField(write_only=True)


class ChangeEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField()


class GoogleLoginSerializer(serializers.Serializer):
    id_token = serializers.CharField()


class ActiveSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveSession
        fields = ["id", "device_info", "ip_address", "user_agent", "created_at", "expires_at"]
