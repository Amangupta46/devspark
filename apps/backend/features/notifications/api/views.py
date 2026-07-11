from django.utils import timezone
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from features.notifications.models import (
    Announcement,
    Notification,
    NotificationCategory,
    NotificationPreference,
    NotificationPriority,
)
from features.notifications.services import template_service

from .serializers import (
    AnnouncementSerializer,
    MessageTemplateSerializer,
    NotificationCategorySerializer,
    NotificationPreferenceSerializer,
    NotificationPrioritySerializer,
    NotificationSerializer,
)


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user, is_archived=False)

    @action(detail=True, methods=["patch"])
    def read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.read_at = timezone.now()
        notification.save()
        return Response({"status": "marked as read"})

    @action(detail=False, methods=["post"], url_path="read-all")
    def read_all(self, request):
        self.get_queryset().filter(is_read=False).update(is_read=True, read_at=timezone.now())
        return Response({"status": "all marked as read"})

    @action(detail=True, methods=["patch"])
    def archive(self, request, pk=None):
        notification = self.get_object()
        notification.is_archived = True
        notification.save()
        return Response({"status": "archived"})


class NotificationPreferenceViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return NotificationPreference.objects.filter(user=self.request.user)


class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Announcement.objects.filter(is_active=True)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NotificationCategory.objects.all()
    serializer_class = NotificationCategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class PriorityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NotificationPriority.objects.all()
    serializer_class = NotificationPrioritySerializer
    permission_classes = [permissions.IsAuthenticated]


class MessageTemplateViewSet(viewsets.ModelViewSet):
    queryset = MessageTemplate.objects.all()
    serializer_class = MessageTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=["post"])
    def preview(self, request):
        subject = request.data.get("subject_template", "")
        body = request.data.get("body_template", "")
        context = request.data.get("context", {})

        preview_data = template_service.preview(subject, body, context)
        return Response(preview_data)
