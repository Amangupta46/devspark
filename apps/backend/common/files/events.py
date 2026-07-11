from typing import Any, Dict

from common.events.models import BaseEvent


class FileUploadedEvent(BaseEvent):
    event_name = "file_uploaded"

    def __init__(self, file_path: str, provider: str, metadata: Dict[str, Any], **kwargs):
        payload = {"file_path": file_path, "provider": provider, "metadata": metadata}
        super().__init__(payload=payload, **kwargs)


class FileDeletedEvent(BaseEvent):
    event_name = "file_deleted"

    def __init__(self, file_path: str, provider: str, **kwargs):
        payload = {"file_path": file_path, "provider": provider}
        super().__init__(payload=payload, **kwargs)


class VirusScanCompletedEvent(BaseEvent):
    event_name = "virus_scan_completed"

    def __init__(self, file_path: str, is_clean: bool, details: str, **kwargs):
        payload = {"file_path": file_path, "is_clean": is_clean, "details": details}
        super().__init__(payload=payload, **kwargs)


class ThumbnailGeneratedEvent(BaseEvent):
    event_name = "thumbnail_generated"

    def __init__(self, original_path: str, thumbnail_path: str, **kwargs):
        payload = {"original_path": original_path, "thumbnail_path": thumbnail_path}
        super().__init__(payload=payload, **kwargs)
