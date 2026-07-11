from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import filters, viewsets
from rest_framework.views import APIView

from common.responses import get_success_response

from ..models import (
    Company,
    Contact,
    Lead,
)
from ..selectors import DashboardSelector
from .serializers import (
    CompanySerializer,
    ContactSerializer,
    DashboardMetricsSerializer,
    LeadSerializer,
)


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().select_related(
        "company", "contact", "stage", "source", "assigned_to"
    )
    serializer_class = LeadSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["stage", "source", "assigned_to", "priority"]
    search_fields = ["title", "lead_number", "company__name", "contact__email", "contact__phone"]
    ordering_fields = ["created_at", "estimated_budget", "expected_closing_date"]


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class DashboardView(APIView):
    @extend_schema(responses={200: DashboardMetricsSerializer})
    def get(self, request):
        metrics = DashboardSelector.get_dashboard_metrics()
        return get_success_response(
            data=metrics, message="Dashboard metrics retrieved successfully."
        )
