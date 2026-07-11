from django.db import models

from common.models import BaseModel

from .members import TeamMember


class Conversation(BaseModel):
    TYPE_CHOICES = [("direct", "Direct Message"), ("group", "Group Chat"), ("channel", "Channel")]

    name = models.CharField(max_length=255, blank=True)
    conversation_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="direct")
    participants = models.ManyToManyField(TeamMember, related_name="conversations")

    def __str__(self):
        return self.name or f"Conversation {self.id}"


class Message(BaseModel):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.ForeignKey(TeamMember, on_delete=models.CASCADE, related_name="sent_messages")

    content = models.TextField()
    has_attachments = models.BooleanField(default=False)

    read_by = models.ManyToManyField(TeamMember, related_name="read_messages", blank=True)

    def __str__(self):
        return f"From {self.sender.user.email} at {self.created_at}"


class MessageReaction(BaseModel):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name="reactions")
    member = models.ForeignKey(TeamMember, on_delete=models.CASCADE)
    emoji = models.CharField(max_length=50)  # e.g. ":smile:"

    def __str__(self):
        return f"{self.member.user.email} reacted {self.emoji}"
