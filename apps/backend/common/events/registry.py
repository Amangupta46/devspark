import logging
from typing import Callable, Dict, List, Type, Union

from .interfaces import EventSubscriber

logger = logging.getLogger(__name__)


class EventRegistry:
    """
    Central registry for mapping events to their subscribers.
    """

    def __init__(self):
        # We store classes or functions
        self._listeners: Dict[str, List[Union[Type[EventSubscriber], Callable]]] = {}

    def subscribe(self, event_name: str, subscriber: Union[Type[EventSubscriber], Callable]):
        """
        Subscribe a handler (class implementing EventSubscriber or a function) to an event name.
        """
        if event_name not in self._listeners:
            self._listeners[event_name] = []

        if subscriber not in self._listeners[event_name]:
            self._listeners[event_name].append(subscriber)
            name = subscriber.__name__ if hasattr(subscriber, "__name__") else str(subscriber)
            logger.debug(f"Subscribed {name} to {event_name}")

    def unsubscribe(self, event_name: str, subscriber: Union[Type[EventSubscriber], Callable]):
        if event_name in self._listeners and subscriber in self._listeners[event_name]:
            self._listeners[event_name].remove(subscriber)
            name = subscriber.__name__ if hasattr(subscriber, "__name__") else str(subscriber)
            logger.debug(f"Unsubscribed {name} from {event_name}")

    def get_subscribers(self, event_name: str) -> List[Union[Type[EventSubscriber], Callable]]:
        """
        Get all registered subscribers for a specific event.
        """
        return self._listeners.get(event_name, [])


# Global registry instance
registry = EventRegistry()
