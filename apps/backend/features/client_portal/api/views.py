from rest_framework import viewsets
from rest_framework.views import APIView

from common.responses import get_success_response

from ..models import ClientMessage, ClientUser, Deliverable, DigitalSignature, SatisfactionSurvey
from ..selectors import ClientDashboardSelector
from .serializers import (
    ClientMessageSerializer,
    ClientUserSerializer,
    DeliverableSerializer,
    DigitalSignatureSerializer,
    SatisfactionSurveySerializer,
)


class ClientUserViewSet(viewsets.ModelViewSet):
    queryset = ClientUser.objects.all()
    serializer_class = ClientUserSerializer


class DeliverableViewSet(viewsets.ModelViewSet):
    queryset = Deliverable.objects.all()
    serializer_class = DeliverableSerializer


class ClientMessageViewSet(viewsets.ModelViewSet):
    queryset = ClientMessage.objects.all()
    serializer_class = ClientMessageSerializer


class SatisfactionSurveyViewSet(viewsets.ModelViewSet):
    queryset = SatisfactionSurvey.objects.all()
    serializer_class = SatisfactionSurveySerializer


class DigitalSignatureViewSet(viewsets.ModelViewSet):
    queryset = DigitalSignature.objects.all()
    serializer_class = DigitalSignatureSerializer


class ClientDashboardView(APIView):
    def get(self, request):
        client_user = ClientUser.objects.first()  # Stubbed
        metrics = ClientDashboardSelector.get_dashboard_metrics(client_user)
        return get_success_response(data=metrics, message="Client Dashboard loaded.")
