from django.db.models import Count, Sum
from django.utils import timezone

from .models import Lead


class DashboardSelector:
    @staticmethod
    def get_dashboard_metrics():
        today = timezone.now().date()

        total_leads = Lead.objects.count()
        todays_leads = Lead.objects.filter(created_at__date=today).count()

        won_leads = Lead.objects.filter(stage__is_terminal_won=True).count()
        lost_leads = Lead.objects.filter(stage__is_terminal_lost=True).count()

        conversion_rate = 0
        if total_leads > 0:
            conversion_rate = round((won_leads / total_leads) * 100, 2)

        revenue_forecast = (
            Lead.objects.filter(
                stage__is_terminal_won=False, stage__is_terminal_lost=False
            ).aggregate(total=Sum("estimated_budget"))["total"]
            or 0
        )

        pipeline_value = Lead.objects.aggregate(total=Sum("estimated_budget"))["total"] or 0

        win_rate = 0
        loss_rate = 0
        resolved_leads = won_leads + lost_leads
        if resolved_leads > 0:
            win_rate = round((won_leads / resolved_leads) * 100, 2)
            loss_rate = round((lost_leads / resolved_leads) * 100, 2)

        # Lead Source Analytics
        source_analytics = (
            Lead.objects.values("source__name").annotate(count=Count("id")).order_by("-count")
        )

        return {
            "total_leads": total_leads,
            "todays_leads": todays_leads,
            "won_leads": won_leads,
            "lost_leads": lost_leads,
            "conversion_rate": conversion_rate,
            "revenue_forecast": revenue_forecast,
            "pipeline_value": pipeline_value,
            "win_rate": win_rate,
            "loss_rate": loss_rate,
            "source_analytics": list(source_analytics),
        }
