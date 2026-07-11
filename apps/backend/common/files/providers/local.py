from typing import Any, BinaryIO, Dict

from django.core.files.storage import FileSystemStorage

from ..interfaces.storage import StorageBackend


class LocalStorageBackend(StorageBackend):
    """
    Implementation of StorageBackend for local filesystem storage.
    """

    def __init__(self):
        self.storage = FileSystemStorage()

    def upload(self, file_stream: BinaryIO, path: str, **kwargs) -> str:
        filename = self.storage.save(path, file_stream)
        return self.storage.url(filename)

    def download(self, path: str) -> BinaryIO:
        if not self.exists(path):
            raise FileNotFoundError(f"File not found: {path}")
        return self.storage.open(path, "rb")

    def delete(self, path: str) -> bool:
        if self.exists(path):
            self.storage.delete(path)
            return True
        return False

    def exists(self, path: str) -> bool:
        return self.storage.exists(path)

    def get_signed_url(self, path: str, expires_in: int = 3600) -> str:
        # Local storage doesn't have secure signed URLs inherently without an intermediate view.
        # Returning standard URL for simplicity in local dev.
        return self.storage.url(path)

    def get_temporary_upload_url(
        self, path: str, expires_in: int = 3600, **kwargs
    ) -> Dict[str, Any]:
        return {
            "url": f"/api/files/upload/local?path={path}",
            "fields": {},
            "expires_in": expires_in,
        }
