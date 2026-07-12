import pytest
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
def test_get_notifications_unauthenticated(api_client):
    response = api_client.get("/api/notifications/messages/")
    assert response.status_code in [401, 403]
