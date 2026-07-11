from django.db.models import Q
from django.utils import timezone

from .models import Project, ProjectTask


class ProjectDashboardSelector:
    @staticmethod
    def get_dashboard_metrics():
        total_projects = Project.objects.count()
        completed_projects = Project.objects.filter(status="completed").count()
        active_projects = Project.objects.filter(~Q(status__in=["completed", "cancelled"])).count()

        total_tasks = ProjectTask.objects.count()
        completed_tasks = ProjectTask.objects.filter(status="completed").count()

        now = timezone.now()
        overdue_tasks = ProjectTask.objects.filter(
            deadline__lt=now,
            status__in=["todo", "in_progress", "code_review", "testing", "blocked"],
        ).count()

        return {
            "total_projects": total_projects,
            "active_projects": active_projects,
            "completed_projects": completed_projects,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "overdue_tasks": overdue_tasks,
        }
