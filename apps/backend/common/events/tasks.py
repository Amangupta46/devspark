import logging
from typing import Any, Dict

from celery import shared_task

from .dispatchers import EventDispatcher
from .models import BaseEvent

logger = logging.getLogger(__name__)


@shared_task
def process_async_event(event_dict: Dict[str, Any]):
    """
    A Celery task that takes a serialized event dictionary,
    reconstructs the BaseEvent, and synchronously dispatches it
    on the worker node.
    """
    try:
        event = BaseEvent.from_dict(event_dict)
        # Using EventDispatcher directly executes it synchronously *inside* the celery worker
        EventDispatcher.dispatch(event)
    except Exception as e:
        logger.error(f"Failed to process async event. Error: {e}")
        # Reraise to let Celery handle retries if configured
        raise
