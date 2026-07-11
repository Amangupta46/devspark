import pytest

from features.notifications.models import NotificationCategory, NotificationPriority


@pytest.mark.django_db
def test_category_creation():
    category = NotificationCategory.objects.create(name="System Alerts", slug="system-alerts")
    assert category.name == "System Alerts"
    assert category.slug == "system-alerts"


@pytest.mark.django_db
def test_priority_creation():
    priority = NotificationPriority.objects.create(level="High", weight=100)
    assert priority.level == "High"
    assert priority.weight == 100
