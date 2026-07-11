from django.db.models import Sum

from features.projects.models import ProjectTask

from .models import CodeReviewRequest, LeaveRequest, TeamMember, Worklog


class ManagerDashboardSelector:
    @staticmethod
    def get_dashboard_metrics(manager_member):
        reports = TeamMember.objects.filter(manager=manager_member)
        report_ids = reports.values_list("id", flat=True)

        pending_leaves = LeaveRequest.objects.filter(
            member_id__in=report_ids, status="pending"
        ).count()
        team_velocity = (
            Worklog.objects.filter(member_id__in=report_ids).aggregate(total=Sum("working_hours"))[
                "total"
            ]
            or 0
        )

        # Calculate Utilization: Assigned hours / Available Hours
        total_available = reports.aggregate(total=Sum("available_hours_per_week"))["total"] or 1

        assigned_tasks = ProjectTask.objects.filter(
            team_worklogs__member_id__in=report_ids
        ).distinct()
        total_assigned = assigned_tasks.aggregate(total=Sum("estimated_hours"))["total"] or 0

        utilization = min(round((float(total_assigned) / float(total_available)) * 100, 2), 100.0)

        return {
            "team_size": reports.count(),
            "pending_leave_approvals": pending_leaves,
            "team_velocity_hours": team_velocity,
            "utilization_percent": utilization,
        }


class DeveloperDashboardSelector:
    @staticmethod
    def get_dashboard_metrics(member):
        my_tasks = ProjectTask.objects.filter(team_worklogs__member=member).distinct()
        completed_tasks = my_tasks.filter(status="completed").count()
        pending_tasks = my_tasks.exclude(status="completed").count()

        pending_reviews = CodeReviewRequest.objects.filter(
            reviewer=member, status="pending"
        ).count()

        return {
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "pending_code_reviews": pending_reviews,
        }
