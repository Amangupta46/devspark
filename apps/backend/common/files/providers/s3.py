from typing import Any, BinaryIO, Dict

from ..interfaces.storage import StorageBackend


class AWSS3Backend(StorageBackend):
    """
    AWS S3 implementation abstraction stub.
    """

    def __init__(self, bucket_name: str, region: str = "us-east-1"):
        self.bucket_name = bucket_name
        self.region = region

    def upload(self, file_stream: BinaryIO, path: str, **kwargs) -> str:
        raise NotImplementedError("AWS SDK (boto3) integration not yet implemented.")

    def download(self, path: str) -> BinaryIO:
        raise NotImplementedError("AWS SDK (boto3) integration not yet implemented.")

    def delete(self, path: str) -> bool:
        raise NotImplementedError("AWS SDK (boto3) integration not yet implemented.")

    def exists(self, path: str) -> bool:
        raise NotImplementedError("AWS SDK (boto3) integration not yet implemented.")

    def get_signed_url(self, path: str, expires_in: int = 3600) -> str:
        raise NotImplementedError("AWS SDK (boto3) integration not yet implemented.")

    def get_temporary_upload_url(
        self, path: str, expires_in: int = 3600, **kwargs
    ) -> Dict[str, Any]:
        raise NotImplementedError("AWS SDK (boto3) integration not yet implemented.")
