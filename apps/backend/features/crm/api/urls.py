from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CompanyViewSet, ContactViewSet, DashboardView, LeadViewSet

router = DefaultRouter()
router.register(r"leads", LeadViewSet)
router.register(r"companies", CompanyViewSet)
router.register(r"contacts", ContactViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", DashboardView.as_view(), name="crm-dashboard"),
]
