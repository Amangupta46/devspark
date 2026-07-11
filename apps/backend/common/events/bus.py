from .dispatchers import async_dispatcher, dispatcher
from .interfaces import EventPublisher
from .models import BaseEvent


class EventBus(EventPublisher):
    """
    The central coordinator for emitting domain events.
    Implements the EventPublisher interface.
    """

    def publish(self, event: BaseEvent, run_async: bool = False) -> None:
        """
        Main entry point for publishing domain events.
        :param event: The event instance to publish.
        :param run_async: If True, dispatches the event via Celery.
        """
        if run_async:
            async_dispatcher.dispatch(event)
        else:
            dispatcher.dispatch(event)


# Global bus instance
bus = EventBus()
