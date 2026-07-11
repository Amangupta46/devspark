from django.db import models

from common.models import BaseModel

from .users import ClientUser


class SatisfactionSurvey(BaseModel):
    project = models.ForeignKey(
        "projects.Project", on_delete=models.CASCADE, related_name="surveys"
    )
    client_user = models.ForeignKey(ClientUser, on_delete=models.CASCADE)

    nps_score = models.IntegerField(help_text="0-10 Net Promoter Score")
    communication_rating = models.IntegerField(help_text="1-5 Stars")
    quality_rating = models.IntegerField(help_text="1-5 Stars")
    timeline_rating = models.IntegerField(help_text="1-5 Stars")

    feedback_text = models.TextField(blank=True)

    def __str__(self):
        return f"Survey by {self.client_user.user.email} for {self.project.name} - NPS {self.nps_score}"
