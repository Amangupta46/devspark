from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import filters, viewsets
from rest_framework.views import APIView

from common.responses import get_success_response

from ..models import Proposal, Quote, QuoteItem, ServiceCatalog
from ..selectors import QuoteDashboardSelector
from .serializers import (
    ProposalSerializer,
    QuoteDashboardSerializer,
    QuoteItemSerializer,
    QuoteSerializer,
    ServiceCatalogSerializer,
)


class ServiceCatalogViewSet(viewsets.ModelViewSet):
    queryset = ServiceCatalog.objects.all()
    serializer_class = ServiceCatalogSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "category"]


class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all().prefetch_related("items")
    serializer_class = QuoteSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status", "currency", "created_by"]
    search_fields = ["quote_number", "lead__lead_number", "company__name", "contact__email"]
    ordering_fields = ["created_at", "grand_total"]


class QuoteItemViewSet(viewsets.ModelViewSet):
    queryset = QuoteItem.objects.all()
    serializer_class = QuoteItemSerializer
    filterset_fields = ["quote"]


class ProposalViewSet(viewsets.ModelViewSet):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer


class QuoteDashboardView(APIView):
    @extend_schema(responses={200: QuoteDashboardSerializer})
    def get(self, request):
        metrics = QuoteDashboardSelector.get_dashboard_metrics()
        return get_success_response(data=metrics, message="Quote dashboard retrieved.")
