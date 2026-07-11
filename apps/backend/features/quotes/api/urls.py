from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ProposalViewSet,
    QuoteDashboardView,
    QuoteItemViewSet,
    QuoteViewSet,
    ServiceCatalogViewSet,
)

router = DefaultRouter()
router.register(r"catalog", ServiceCatalogViewSet)
router.register(r"quotes", QuoteViewSet)
router.register(r"items", QuoteItemViewSet)
router.register(r"proposals", ProposalViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", QuoteDashboardView.as_view(), name="quotes-dashboard"),
]
