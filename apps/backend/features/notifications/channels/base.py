class BaseChannel:
    """
    Abstract foundation for all notification delivery channels.
    """

    channel_name = "base"

    def send(self, recipient, title: str, body: str, metadata: dict | None = None) -> bool:
        """
        Attempt to send the notification.
        Returns True if successful, False otherwise.
        """
        raise NotImplementedError("Subclasses must implement send()")
