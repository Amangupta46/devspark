from rest_framework import serializers

from ..models import Proposal, ProposalTemplate, Quote, QuoteItem, ServiceCatalog


class ServiceCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCatalog
        fields = "__all__"


class QuoteItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteItem
        fields = "__all__"
        read_only_fields = ("line_total",)


class QuoteSerializer(serializers.ModelSerializer):
    items = QuoteItemSerializer(many=True, read_only=True)

    class Meta:
        model = Quote
        fields = "__all__"
        read_only_fields = ("subtotal", "tax", "grand_total")


class ProposalTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalTemplate
        fields = "__all__"


class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = "__all__"


class QuoteDashboardSerializer(serializers.Serializer):
    quotes_created = serializers.IntegerField()
    accepted_quotes = serializers.IntegerField()
    rejected_quotes = serializers.IntegerField()
    conversion_percent = serializers.FloatField()
    revenue_forecast = serializers.DecimalField(max_digits=12, decimal_places=2)
    average_quote_value = serializers.FloatField()
