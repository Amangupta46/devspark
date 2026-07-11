from typing import Any, BinaryIO, Dict

from ..interfaces.storage import StorageBackend


class MinIOBackend(StorageBackend):
    """
    MinIO implementation abstraction stub.
    """

    def __init__(self, endpoint: str, access_key: str, secret_key: str, secure: bool = True):
        self.endpoint = endpoint
        self.access_key = access_key
        self.secret_key = secret_key
        self.secure = secure

    def upload(self, file_stream: BinaryIO, path: str, **kwargs) -> str:
        raise NotImplementedError("MinIO SDK integration not yet implemented.")

    def download(self, path: str) -> BinaryIO:
        raise NotImplementedError("MinIO SDK integration not yet implemented.")

    def delete(self, path: str) -> bool:
        raise NotImplementedError("MinIO SDK integration not yet implemented.")

    def exists(self, path: str) -> bool:
        raise NotImplementedError("MinIO SDK integration not yet implemented.")

    def get_signed_url(self, path: str, expires_in: int = 3600) -> str:
        raise NotImplementedError("MinIO SDK integration not yet implemented.")

    def get_temporary_upload_url(
        self, path: str, expires_in: int = 3600, **kwargs
    ) -> Dict[str, Any]:
        raise NotImplementedError("MinIO SDK integration not yet implemented.")
