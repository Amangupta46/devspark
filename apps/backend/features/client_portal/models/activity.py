from django.db import models

from common.models import BaseModel

from .users import ClientUser


class ClientActivity(BaseModel):
    client_user = models.ForeignKey(ClientUser, on_delete=models.CASCADE, related_name="activities")
    project = models.ForeignKey("projects.Project", on_delete=models.CASCADE, null=True, blank=True)

    action = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.client_user.user.email} - {self.action}"
