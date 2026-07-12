import inspect
import logging

from .interfaces import EventSubscriber
from .models import BaseEvent
from .registry import registry

logger = logging.getLogger(__name__)


class EventDispatcher:
    """
    Synchronous dispatcher for events.
    Executes subscribers in the same thread.
    """

    @staticmethod
    def dispatch(event: BaseEvent):
        subscribers = registry.get_subscribers(event.event_name)
        if not subscribers:
            logger.debug(f"No subscribers found for event: {event.event_name}")
            return

        for subscriber in subscribers:
            try:

                # If subscriber is a class implementing EventSubscriber
                if inspect.isclass(subscriber) and issubclass(subscriber, EventSubscriber):
                    instance = subscriber()
                    instance.handle(event)
                else:
                    # Fallback for simple callable functions
                    subscriber(event)  # type: ignore[call-arg]
            except Exception as e:
                logger.error(f"Error dispatching {event.event_name} to {subscriber}: {e}")


class AsyncEventDispatcher:
    """
    Asynchronous dispatcher using Celery.
    Note: For this to work, we need a generic Celery task that takes event dict.
    We import inline to avoid Celery dependency if used synchronously.
    """

    @staticmethod
    def dispatch(event: BaseEvent):
        try:
            from .tasks import process_async_event

            # Serialize the event to a dict before sending to Celery
            process_async_event.delay(event.to_dict())
        except ImportError:
            logger.warning(
                "Celery task 'process_async_event' not found. Falling back to sync dispatch."
            )
            EventDispatcher.dispatch(event)
        except Exception as e:
            logger.error(f"Error queuing async event {event.event_name}: {e}")


dispatcher = EventDispatcher()
async_dispatcher = AsyncEventDispatcher()
