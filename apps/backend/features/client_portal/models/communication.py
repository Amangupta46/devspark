from django.db import models

from common.models import BaseModel

from .users import ClientUser


class Announcement(BaseModel):
    title = models.CharField(max_length=255)
    content = models.TextField()
    is_active = models.BooleanField(default=True)

    # Target specific companies or broadcast to all
    target_companies = models.ManyToManyField(
        "crm.Company", blank=True, related_name="announcements"
    )

    def __str__(self):
        return self.title


class ClientMessage(BaseModel):
    project = models.ForeignKey(
        "projects.Project", on_delete=models.CASCADE, related_name="client_messages"
    )

    sender_client = models.ForeignKey(ClientUser, on_delete=models.SET_NULL, null=True, blank=True)
    sender_team = models.ForeignKey(
        "team.TeamMember", on_delete=models.SET_NULL, null=True, blank=True
    )

    content = models.TextField()
    attachment = models.FileField(upload_to="client_messages/", null=True, blank=True)

    parent_message = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )

    def __str__(self):
        return f"Message on {self.project.name} at {self.created_at}"


class MessageReadReceipt(BaseModel):
    message = models.ForeignKey(
        ClientMessage, on_delete=models.CASCADE, related_name="read_receipts"
    )
    client_user = models.ForeignKey(ClientUser, on_delete=models.CASCADE, null=True, blank=True)
    team_member = models.ForeignKey(
        "team.TeamMember", on_delete=models.CASCADE, null=True, blank=True
    )
    read_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("message", "client_user", "team_member")
