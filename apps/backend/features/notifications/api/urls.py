from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AnnouncementViewSet,
    CategoryViewSet,
    MessageTemplateViewSet,
    NotificationPreferenceViewSet,
    NotificationViewSet,
    PriorityViewSet,
)

router = DefaultRouter()
router.register(r"messages", NotificationViewSet, basename="notification")
router.register(r"preferences", NotificationPreferenceViewSet, basename="notification-preference")
router.register(r"announcements", AnnouncementViewSet, basename="announcement")
router.register(r"categories", CategoryViewSet, basename="notification-category")
router.register(r"priorities", PriorityViewSet, basename="notification-priority")
router.register(r"templates", MessageTemplateViewSet, basename="notification-template")

urlpatterns = [
    path("", include(router.urls)),
]
