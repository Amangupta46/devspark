from django.conf import settings
from django.db import models


class WorkflowInstance(models.Model):
    """
    Links a business entity (like an Invoice) to a specific running Workflow process.
    """

    class Meta:
        db_table = "common_workflow_instance"

    definition_id = models.CharField(max_length=100)  # e.g. "invoice_approval_v1"
    entity_type = models.CharField(max_length=100)
    entity_id = models.CharField(max_length=100)
    current_state = models.CharField(max_length=100)
    is_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"{self.definition_id} for {self.entity_type} {self.entity_id} ({self.current_state})"
        )


class WorkflowStep(models.Model):
    """
    Tracks a specific step in a workflow (e.g. "Awaiting Manager Approval").
    """

    class Meta:
        db_table = "common_workflow_step"

    instance = models.ForeignKey(WorkflowInstance, on_delete=models.CASCADE, related_name="steps")
    step_name = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default="PENDING")  # PENDING, COMPLETED, SKIPPED
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL
    )

    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)


class WorkflowHistory(models.Model):
    """
    Immutable log of every state transition.
    """

    class Meta:
        db_table = "common_workflow_history"
        ordering = ["-timestamp"]

    instance = models.ForeignKey(WorkflowInstance, on_delete=models.CASCADE, related_name="history")
    from_state = models.CharField(max_length=100)
    to_state = models.CharField(max_length=100)
    action = models.CharField(max_length=100)

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL
    )
    comments = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)
