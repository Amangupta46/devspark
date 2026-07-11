from django.db import models

from common.models import BaseModel

from .users import ClientUser


class BrandAsset(BaseModel):
    company = models.ForeignKey(
        "crm.Company", on_delete=models.CASCADE, related_name="brand_assets"
    )
    uploaded_by = models.ForeignKey(ClientUser, on_delete=models.SET_NULL, null=True)

    logo = models.ImageField(upload_to="client_assets/logos/", null=True, blank=True)
    primary_color = models.CharField(max_length=20, blank=True)
    secondary_color = models.CharField(max_length=20, blank=True)
    typography_notes = models.TextField(blank=True)

    def __str__(self):
        return f"Brand Assets for {self.company.name}"


class OnboardingWorkflow(BaseModel):
    company = models.OneToOneField(
        "crm.Company", on_delete=models.CASCADE, related_name="onboarding"
    )
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Onboarding - {self.company.name}"


class OnboardingStep(BaseModel):
    workflow = models.ForeignKey(OnboardingWorkflow, on_delete=models.CASCADE, related_name="steps")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    completed_by = models.ForeignKey(ClientUser, on_delete=models.SET_NULL, null=True, blank=True)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Step {self.order}: {self.title}"
