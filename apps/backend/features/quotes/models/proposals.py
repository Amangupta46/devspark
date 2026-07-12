from django.db import models

from common.models import BaseModel
from features.crm.models import Company, Contact

from .quotes import Quote


class ProposalTemplate(BaseModel):
    name: models.CharField = models.CharField(max_length=255, unique=True)
    executive_summary_template: models.TextField = models.TextField(blank=True)
    scope_of_work_template: models.TextField = models.TextField(blank=True)
    terms_and_conditions: models.TextField = models.TextField(blank=True)
    payment_terms: models.TextField = models.TextField(blank=True)
    revision_policy: models.TextField = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class Proposal(BaseModel):
    proposal_number: models.CharField = models.CharField(max_length=50, unique=True)
    quote: models.OneToOneField = models.OneToOneField(
        Quote, on_delete=models.CASCADE, related_name="proposal"
    )
    client_company: models.ForeignKey = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )
    client_contact: models.ForeignKey = models.ForeignKey(
        Contact, on_delete=models.SET_NULL, null=True, blank=True
    )

    template: models.ForeignKey = models.ForeignKey(
        ProposalTemplate, on_delete=models.SET_NULL, null=True, blank=True
    )
    executive_summary: models.TextField = models.TextField(blank=True)
    scope_of_work: models.TextField = models.TextField(blank=True)
    deliverables: models.TextField = models.TextField(blank=True)
    timeline: models.TextField = models.TextField(blank=True)
    technology_stack: models.TextField = models.TextField(blank=True)

    terms_and_conditions: models.TextField = models.TextField(blank=True)
    payment_terms: models.TextField = models.TextField(blank=True)
    revision_policy: models.TextField = models.TextField(blank=True)

    acceptance_signature: models.TextField = models.TextField(
        blank=True, help_text="Digital signature placeholder or IP trace"
    )
    accepted_at: models.DateTimeField = models.DateTimeField(null=True, blank=True)

    def __str__(self) -> str:
        return f"Proposal {self.proposal_number} for {self.quote.quote_number}"
