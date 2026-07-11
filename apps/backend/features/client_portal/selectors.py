from django.db.models import Q

from features.projects.models import Project

from .models import Announcement, ClientMessage, Deliverable


class ClientDashboardSelector:
    @staticmethod
    def get_dashboard_metrics(client_user):
        company = client_user.company

        active_projects = Project.objects.filter(
            company=company, status__in=["in_progress", "review"]
        ).count()

        pending_deliverables = (
            Deliverable.objects.filter(project__company=company, versions__revisions__status="open")
            .distinct()
            .count()
        )

        unread_messages = (
            ClientMessage.objects.filter(project__company=company)
            .exclude(read_receipts__client_user=client_user)
            .count()
        )

        announcements = Announcement.objects.filter(
            Q(target_companies=company) | Q(target_companies__isnull=True), is_active=True
        ).count()

        return {
            "active_projects": active_projects,
            "pending_deliverable_revisions": pending_deliverables,
            "unread_messages": unread_messages,
            "active_announcements": announcements,
        }
