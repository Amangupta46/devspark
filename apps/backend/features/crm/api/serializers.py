from rest_framework import serializers

from ..models import (
    ActivityTimeline,
    CommunicationLog,
    Company,
    Contact,
    Lead,
    LeadPipelineStage,
    LeadSource,
)


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


class LeadPipelineStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadPipelineStage
        fields = "__all__"


class LeadSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSource
        fields = "__all__"


class LeadSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)
    contact_name = serializers.CharField(source="contact.first_name", read_only=True)
    stage_name = serializers.CharField(source="stage.name", read_only=True)
    source_name = serializers.CharField(source="source.name", read_only=True)

    class Meta:
        model = Lead
        fields = "__all__"


class ActivityTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTimeline
        fields = "__all__"


class CommunicationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationLog
        fields = "__all__"


class DashboardMetricsSerializer(serializers.Serializer):
    total_leads = serializers.IntegerField()
    todays_leads = serializers.IntegerField()
    won_leads = serializers.IntegerField()
    lost_leads = serializers.IntegerField()
    conversion_rate = serializers.FloatField()
    revenue_forecast = serializers.DecimalField(max_digits=12, decimal_places=2)
    pipeline_value = serializers.DecimalField(max_digits=12, decimal_places=2)
    win_rate = serializers.FloatField()
    loss_rate = serializers.FloatField()
    source_analytics = serializers.ListField(child=serializers.DictField())
