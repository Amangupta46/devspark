import hashlib

from django.db import transaction
from django.utils import timezone

from .models import (
    DeliverableVersion,
    DigitalSignature,
    OnboardingStep,
    OnboardingWorkflow,
)


class ClientOnboardingService:
    @staticmethod
    @transaction.atomic
    def initialize_onboarding(company):
        workflow = OnboardingWorkflow.objects.create(company=company)

        steps = [
            "Upload Company Logo",
            "Define Brand Colors",
            "Add Billing Contact",
            "Complete Platform Walkthrough",
        ]

        for idx, title in enumerate(steps, 1):
            OnboardingStep.objects.create(workflow=workflow, title=title, order=idx)
        return workflow


class DeliverableService:
    @staticmethod
    @transaction.atomic
    def upload_new_version(deliverable, file, notes=""):
        current_version = deliverable.versions.count()

        version = DeliverableVersion.objects.create(
            deliverable=deliverable,
            version_number=current_version + 1,
            file=file,
            upload_notes=notes,
        )
        return version


class SignatureService:
    @staticmethod
    def generate_signature(client_user, content_object, ip_address, legal_name):
        # A simple cryptographic hash representing the digital signature
        payload = f"{client_user.id}:{content_object.id}:{timezone.now()}:{ip_address}"
        signature_hash = hashlib.sha256(payload.encode()).hexdigest()

        return DigitalSignature.objects.create(
            content_object=content_object,
            client_user=client_user,
            ip_address=ip_address,
            legal_name_typed=legal_name,
            signature_hash=signature_hash,
        )
