from dataclasses import dataclass, field
from datetime import datetime
from typing import List


@dataclass
class FilePermissions:
    """
    Represents access control for a specific file.
    """

    is_public: bool = False
    allowed_users: List[str] = field(default_factory=list)
    allowed_roles: List[str] = field(default_factory=list)


@dataclass
class FileMetadata:
    """
    Standardized metadata for any file stored across any provider.
    """

    file_id: str
    original_name: str
    mime_type: str
    size_bytes: int
    storage_path: str
    provider_name: str
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
    permissions: FilePermissions = field(default_factory=FilePermissions)
    version: str = "1.0"


@dataclass
class FileTags:
    """
    Tags associated with a file for the search foundation.
    """

    file_id: str
    tags: List[str] = field(default_factory=list)


class FileSearchInterface:
    """
    Foundational interface for file searching.
    """

    def search_by_tags(self, tags: List[str]) -> List[FileMetadata]:
        raise NotImplementedError

    def search_by_name(self, name_query: str) -> List[FileMetadata]:
        raise NotImplementedError
