from django.db import models

from common.models import BaseModel


class Company(BaseModel):
    organization = models.ForeignKey(
        "team.Organization",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="crm_companies",
    )
    name = models.CharField(max_length=255)
    website = models.URLField(blank=True)
    industry = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Contact(BaseModel):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="contacts", null=True, blank=True
    )
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=50, blank=True)
    linkedin = models.URLField(blank=True)
    designation = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"


class LeadTag(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=20, default="#000000")

    def __str__(self):
        return self.name


class LeadSource(BaseModel):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class LeadPipelineStage(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    order = models.PositiveIntegerField(default=0)
    is_terminal_won = models.BooleanField(default=False)
    is_terminal_lost = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name
