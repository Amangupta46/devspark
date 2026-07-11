from features.notifications.services import webhook_service


def test_webhook_service():
    # Test foundation of webhook service
    result = webhook_service.trigger_webhook("http://example.com/hook", {"data": 123})
    assert result is True
