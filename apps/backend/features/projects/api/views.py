from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from common.responses import get_success_response

from ..models import Project, ProjectTask, TimeLog
from ..selectors import ProjectDashboardSelector
from ..services import KanbanOrderingService
from .serializers import (
    ProjectDashboardSerializer,
    ProjectSerializer,
    ProjectTaskSerializer,
    TimeLogSerializer,
)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().prefetch_related("phases")
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status", "priority", "manager"]
    search_fields = ["project_id", "project_code", "name", "client__name"]


class ProjectTaskViewSet(viewsets.ModelViewSet):
    queryset = ProjectTask.objects.all()
    serializer_class = ProjectTaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["project", "sprint", "assigned_to", "status", "priority"]
    search_fields = ["title"]

    @extend_schema(request=None, responses={200: ProjectTaskSerializer})
    @action(detail=True, methods=["post"])
    def reorder(self, request, pk=None):
        new_status = request.data.get("status")
        new_order = request.data.get("kanban_order")
        task = KanbanOrderingService.reorder_task(pk, new_status, new_order)
        return Response(self.get_serializer(task).data)


class TimeLogViewSet(viewsets.ModelViewSet):
    queryset = TimeLog.objects.all()
    serializer_class = TimeLogSerializer


class ProjectDashboardView(APIView):
    @extend_schema(responses={200: ProjectDashboardSerializer})
    def get(self, request):
        metrics = ProjectDashboardSelector.get_dashboard_metrics()
        return get_success_response(data=metrics, message="Project dashboard retrieved.")
