from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from common.responses import get_success_response

from ..models import (
    CodeReviewRequest,
    Conversation,
    LeaveRequest,
    Organization,
    TeamMember,
    Worklog,
)
from ..selectors import DeveloperDashboardSelector, ManagerDashboardSelector
from ..services import LeaveManagementService
from .serializers import (
    CodeReviewRequestSerializer,
    ConversationSerializer,
    LeaveRequestSerializer,
    OrganizationSerializer,
    TeamMemberSerializer,
    WorklogSerializer,
)


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["department", "team", "employment_status", "work_type"]
    search_fields = ["user__email", "designation", "employee_id"]


class WorklogViewSet(viewsets.ModelViewSet):
    queryset = Worklog.objects.all()
    serializer_class = WorklogSerializer
    filterset_fields = ["member", "task", "date"]


class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    filterset_fields = ["member", "status", "leave_type"]

    @action(detail=True, methods=["post"])
    def process(self, request, pk=None):
        leave = self.get_object()
        action_type = request.data.get("action")  # 'approve' or 'reject'
        # In a real app, manager is derived from request.user.team_profile
        manager = TeamMember.objects.first()  # Stubbed
        LeaveManagementService.process_leave_request(leave, action_type, manager)
        return Response(self.get_serializer(leave).data)


class CodeReviewViewSet(viewsets.ModelViewSet):
    queryset = CodeReviewRequest.objects.all()
    serializer_class = CodeReviewRequestSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer


class ManagerDashboardView(APIView):
    def get(self, request):
        # Stubbed manager resolving
        manager = TeamMember.objects.first()
        metrics = ManagerDashboardSelector.get_dashboard_metrics(manager)
        return get_success_response(data=metrics, message="Manager dashboard retrieved.")


class DeveloperDashboardView(APIView):
    def get(self, request):
        dev = TeamMember.objects.first()
        metrics = DeveloperDashboardSelector.get_dashboard_metrics(dev)
        return get_success_response(data=metrics, message="Developer dashboard retrieved.")
