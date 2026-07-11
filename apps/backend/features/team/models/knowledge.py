from django.db import models

from common.models import BaseModel

from .core import Department, Organization
from .members import TeamMember


class KnowledgeArticle(BaseModel):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    author = models.ForeignKey(TeamMember, on_delete=models.SET_NULL, null=True)

    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=100, blank=True)
    version = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.title


class SharedFile(BaseModel):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    uploaded_by = models.ForeignKey(TeamMember, on_delete=models.SET_NULL, null=True)

    file = models.FileField(upload_to="org_shared_files/")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
