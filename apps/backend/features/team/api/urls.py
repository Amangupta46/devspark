from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CodeReviewViewSet,
    ConversationViewSet,
    DeveloperDashboardView,
    LeaveRequestViewSet,
    ManagerDashboardView,
    OrganizationViewSet,
    TeamMemberViewSet,
    WorklogViewSet,
)

router = DefaultRouter()
router.register(r"organizations", OrganizationViewSet)
router.register(r"members", TeamMemberViewSet)
router.register(r"worklogs", WorklogViewSet)
router.register(r"leaves", LeaveRequestViewSet)
router.register(r"reviews", CodeReviewViewSet)
router.register(r"conversations", ConversationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/manager/", ManagerDashboardView.as_view(), name="manager-dashboard"),
    path("dashboard/developer/", DeveloperDashboardView.as_view(), name="developer-dashboard"),
]
