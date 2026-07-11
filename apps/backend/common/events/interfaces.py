from abc import ABC, abstractmethod

from .models import BaseEvent


class EventSubscriber(ABC):
    """
    Abstract base class for all event subscribers.
    """

    @abstractmethod
    def handle(self, event: BaseEvent) -> None:
        """
        Handle the incoming event.
        """
        pass


class EventPublisher(ABC):
    """
    Interface for publishing events.
    """

    @abstractmethod
    def publish(self, event: BaseEvent) -> None:
        """
        Publish a domain event.
        """
        pass
