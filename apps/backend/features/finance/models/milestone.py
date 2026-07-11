from django.db import models

from common.models import BaseModel


class BillingMilestone(BaseModel):
    project = models.ForeignKey(
        "projects.Project", on_delete=models.CASCADE, related_name="billing_milestones"
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.ForeignKey("finance.Currency", on_delete=models.PROTECT)
    target_date = models.DateField(null=True, blank=True)

    status = models.CharField(
        max_length=50,
        choices=(
            ("pending", "Pending"),
            ("completed", "Completed"),
            ("invoiced", "Invoiced"),
            ("paid", "Paid"),
        ),
        default="pending",
    )

    invoice = models.ForeignKey(
        "finance.Invoice",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="milestones",
    )

    def __str__(self):
        return f"Milestone: {self.name} for {self.project}"
