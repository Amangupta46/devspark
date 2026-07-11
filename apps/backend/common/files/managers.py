from typing import Any, BinaryIO, Dict, Optional

from common.events.bus import bus

from .events import (
    FileDeletedEvent,
    FileUploadedEvent,
    ThumbnailGeneratedEvent,
    VirusScanCompletedEvent,
)
from .interfaces.processing import ThumbnailGeneratorInterface
from .interfaces.security import VirusScannerInterface
from .interfaces.storage import StorageProvider


class StorageManager:
    """
    Orchestrates file uploads, downloads, and deletions across different providers.
    Integrates with Virus Scanners, Thumbnail Generators, and the Event Bus.
    """

    def __init__(
        self,
        provider: StorageProvider,
        virus_scanner: Optional[VirusScannerInterface] = None,
        thumbnail_generator: Optional[ThumbnailGeneratorInterface] = None,
    ):
        self.provider = provider
        self.virus_scanner = virus_scanner
        self.thumbnail_generator = thumbnail_generator

    def upload_file(
        self, file_stream: BinaryIO, path: str, metadata: Dict[str, Any] = None, **kwargs
    ) -> str:
        """
        Uploads a file, optionally scanning for viruses first, and generates thumbnails post-upload.
        """
        if metadata is None:
            metadata = {}

        # 1. Pre-upload: Virus Scanning
        if self.virus_scanner:
            scan_result = self.virus_scanner.scan(file_stream)
            # Rewind stream after scan
            file_stream.seek(0)

            # Emit scan event
            bus.publish(
                VirusScanCompletedEvent(
                    file_path=path, is_clean=scan_result.is_clean, details=scan_result.details
                ),
                run_async=True,
            )

            if not scan_result.is_clean:
                raise ValueError(f"Virus scan failed for {path}: {scan_result.details}")

        # 2. Upload to backend
        file_url = self.provider.backend.upload(file_stream, path, **kwargs)

        # 3. Post-upload: Event Emission
        bus.publish(
            FileUploadedEvent(
                file_path=path, provider=self.provider.__class__.__name__, metadata=metadata
            ),
            run_async=True,
        )

        # 4. Post-upload: Thumbnail Generation (could also be async in an event listener)
        if self.thumbnail_generator:
            file_stream.seek(0)
            thumb_stream = self.thumbnail_generator.generate_thumbnail(file_stream)
            thumb_path = f"{path}_thumb"
            self.provider.backend.upload(thumb_stream, thumb_path)

            bus.publish(
                ThumbnailGeneratedEvent(original_path=path, thumbnail_path=thumb_path),
                run_async=True,
            )

        return file_url

    def delete_file(self, path: str) -> bool:
        """
        Deletes a file and emits an event.
        """
        success = self.provider.backend.delete(path)
        if success:
            bus.publish(
                FileDeletedEvent(file_path=path, provider=self.provider.__class__.__name__),
                run_async=True,
            )
        return success

    def get_temporary_upload_url(
        self, path: str, expires_in: int = 3600, **kwargs
    ) -> Dict[str, Any]:
        """
        Generates a direct-upload URL for clients.
        """
        return self.provider.backend.get_temporary_upload_url(path, expires_in, **kwargs)

    def get_signed_download_url(self, path: str, expires_in: int = 3600) -> str:
        """
        Generates a signed URL to securely download a file.
        """
        return self.provider.backend.get_signed_url(path, expires_in)
