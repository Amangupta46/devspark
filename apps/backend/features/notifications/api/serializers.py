from rest_framework import serializers

from features.notifications.models import (
    Announcement,
    MessageTemplate,
    Notification,
    NotificationCategory,
    NotificationPreference,
    NotificationPriority,
)


class NotificationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationCategory
        fields = ["id", "name", "description", "slug", "is_active"]


class NotificationPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationPriority
        fields = ["id", "level", "weight"]


class NotificationSerializer(serializers.ModelSerializer):
    category = NotificationCategorySerializer(read_only=True)
    priority = NotificationPrioritySerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            "id",
            "category",
            "priority",
            "title",
            "body",
            "metadata",
            "is_read",
            "read_at",
            "is_archived",
            "is_pinned",
            "created_at",
        ]


class NotificationPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationPreference
        fields = [
            "id",
            "category",
            "delivery_mode",
            "email_enabled",
            "in_app_enabled",
            "sms_enabled",
            "push_enabled",
            "whatsapp_enabled",
        ]


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = "__all__"


class MessageTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageTemplate
        fields = "__all__"
