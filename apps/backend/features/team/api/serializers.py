from rest_framework import serializers

from ..models import (
    CodeReviewRequest,
    Conversation,
    Department,
    LeaveRequest,
    Message,
    Organization,
    Team,
    TeamMember,
    Worklog,
)


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = "__all__"


class WorklogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worklog
        fields = "__all__"


class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = "__all__"


class CodeReviewRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeReviewRequest
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class DashboardMetricsSerializer(serializers.Serializer):
    # Depending on the dashboard (Manager vs Dev), the response schema might differ slightly.
    # We will use generic dict responses via drf_spectacular's inline serializers or keep it loose.
    pass
