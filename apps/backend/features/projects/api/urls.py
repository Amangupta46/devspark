from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProjectDashboardView, ProjectTaskViewSet, ProjectViewSet, TimeLogViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet)
router.register(r"tasks", ProjectTaskViewSet)
router.register(r"timelogs", TimeLogViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", ProjectDashboardView.as_view(), name="projects-dashboard"),
]
