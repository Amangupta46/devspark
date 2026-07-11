from rest_framework import serializers

from ..models import (
    ClientMessage,
    ClientUser,
    Deliverable,
    DigitalSignature,
    OnboardingWorkflow,
    SatisfactionSurvey,
)


class ClientUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientUser
        fields = "__all__"


class OnboardingWorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnboardingWorkflow
        fields = "__all__"


class DeliverableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deliverable
        fields = "__all__"


class ClientMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientMessage
        fields = "__all__"


class SatisfactionSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = SatisfactionSurvey
        fields = "__all__"


class DigitalSignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = DigitalSignature
        fields = "__all__"
