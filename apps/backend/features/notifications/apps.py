from django.apps import AppConfig
from django.db.models.signals import post_migrate


def create_initial_categories(sender, **kwargs):
    from features.notifications.models import NotificationCategory

    # Explicitly satisfy the 'Security Notification category' requirement
    NotificationCategory.objects.get_or_create(
        slug="security",
        defaults={"name": "Security", "description": "Security Alerts and Account Safety"},
    )


class NotificationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "features.notifications"

    def ready(self):
        post_migrate.connect(create_initial_categories, sender=self)
