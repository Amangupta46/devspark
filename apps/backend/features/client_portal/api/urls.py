from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ClientDashboardView,
    ClientMessageViewSet,
    ClientUserViewSet,
    DeliverableViewSet,
    DigitalSignatureViewSet,
    SatisfactionSurveyViewSet,
)

router = DefaultRouter()
router.register(r"users", ClientUserViewSet)
router.register(r"deliverables", DeliverableViewSet)
router.register(r"messages", ClientMessageViewSet)
router.register(r"surveys", SatisfactionSurveyViewSet)
router.register(r"signatures", DigitalSignatureViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", ClientDashboardView.as_view(), name="client-dashboard"),
]
