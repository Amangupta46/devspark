from django.db.models import Sum

from .models import Quote


class QuoteDashboardSelector:
    @staticmethod
    def get_dashboard_metrics():
        total_quotes = Quote.objects.count()
        accepted_quotes = Quote.objects.filter(status="accepted").count()
        rejected_quotes = Quote.objects.filter(status="rejected").count()

        conversion_percent = 0
        resolved_quotes = accepted_quotes + rejected_quotes
        if resolved_quotes > 0:
            conversion_percent = round((accepted_quotes / resolved_quotes) * 100, 2)

        revenue_forecast = (
            Quote.objects.filter(status__in=["draft", "sent", "viewed", "negotiation"]).aggregate(
                total=Sum("grand_total")
            )["total"]
            or 0
        )

        avg_quote_value = 0
        if total_quotes > 0:
            pipeline_total = Quote.objects.aggregate(total=Sum("grand_total"))["total"] or 0
            avg_quote_value = round(pipeline_total / total_quotes, 2)

        return {
            "quotes_created": total_quotes,
            "accepted_quotes": accepted_quotes,
            "rejected_quotes": rejected_quotes,
            "conversion_percent": conversion_percent,
            "revenue_forecast": revenue_forecast,
            "average_quote_value": avg_quote_value,
        }
