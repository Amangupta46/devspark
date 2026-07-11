from typing import Any, BinaryIO, Dict

from ..interfaces.storage import StorageBackend


class CloudinaryBackend(StorageBackend):
    """
    Cloudinary implementation abstraction stub.
    """

    def __init__(self, cloud_name: str, api_key: str, api_secret: str):
        self.cloud_name = cloud_name
        self.api_key = api_key
        self.api_secret = api_secret

    def upload(self, file_stream: BinaryIO, path: str, **kwargs) -> str:
        raise NotImplementedError("Cloudinary SDK integration not yet implemented.")

    def download(self, path: str) -> BinaryIO:
        raise NotImplementedError("Cloudinary SDK integration not yet implemented.")

    def delete(self, path: str) -> bool:
        raise NotImplementedError("Cloudinary SDK integration not yet implemented.")

    def exists(self, path: str) -> bool:
        raise NotImplementedError("Cloudinary SDK integration not yet implemented.")

    def get_signed_url(self, path: str, expires_in: int = 3600) -> str:
        raise NotImplementedError("Cloudinary SDK integration not yet implemented.")

    def get_temporary_upload_url(
        self, path: str, expires_in: int = 3600, **kwargs
    ) -> Dict[str, Any]:
        raise NotImplementedError("Cloudinary SDK integration not yet implemented.")
