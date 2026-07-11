from abc import ABC, abstractmethod
from typing import Any, BinaryIO, Dict


class StorageBackend(ABC):
    """
    Low-level abstraction for storage operations.
    Implementations of this class interact directly with SDKs (e.g., boto3, os).
    """

    @abstractmethod
    def upload(self, file_stream: BinaryIO, path: str, **kwargs) -> str:
        """Uploads a file to the specified path and returns the final URL or path."""
        pass

    @abstractmethod
    def download(self, path: str) -> BinaryIO:
        """Downloads a file from the specified path as a stream."""
        pass

    @abstractmethod
    def delete(self, path: str) -> bool:
        """Deletes a file from the specified path."""
        pass

    @abstractmethod
    def exists(self, path: str) -> bool:
        """Checks if a file exists at the specified path."""
        pass

    @abstractmethod
    def get_signed_url(self, path: str, expires_in: int = 3600) -> str:
        """Generates a pre-signed URL for downloading."""
        pass

    @abstractmethod
    def get_temporary_upload_url(
        self, path: str, expires_in: int = 3600, **kwargs
    ) -> Dict[str, Any]:
        """Generates a temporary pre-signed URL for direct client-side uploading."""
        pass


class StorageProvider(ABC):
    """
    High-level abstraction that composes a StorageBackend and provides
    business-level features like folder management and versioning.
    """

    def __init__(self, backend: StorageBackend):
        self.backend = backend

    @abstractmethod
    def manage_folders(self, action: str, folder_path: str, **kwargs) -> Any:
        """Handles logical folder creation, renaming, or deletion."""
        pass

    @abstractmethod
    def get_file_versions(self, path: str) -> list:
        """Retrieves versions of a file if the backend supports versioning."""
        pass
