from typing import Callable, Type, Union

from .interfaces import EventSubscriber
from .registry import registry


def subscribe_to(event_name: str):
    """
    Decorator to easily register a function or an EventSubscriber class to an event.

    Usage:
        @subscribe_to('user_created')
        def handle_user_created(event):
            pass

        @subscribe_to('user_created')
        class UserCreatedHandler(EventSubscriber):
            def handle(self, event):
                pass
    """

    def decorator(target: Union[Callable, Type[EventSubscriber]]):
        registry.subscribe(event_name, target)
        return target

    return decorator
