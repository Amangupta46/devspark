from typing import Any, Dict, List

from ..interfaces import SearchProvider


class MeilisearchProvider(SearchProvider):
    """
    Meilisearch provider abstraction stub.
    """

    def __init__(self, url: str, api_key: str):
        self.url = url
        self.api_key = api_key
        self.client = None  # Future: meilisearch.Client(url, api_key)

    def index_document(self, index_name: str, doc_id: str, document: Dict[str, Any]):
        raise NotImplementedError("Meilisearch integration not yet implemented.")

    def delete_document(self, index_name: str, doc_id: str):
        raise NotImplementedError("Meilisearch integration not yet implemented.")

    def bulk_index(self, index_name: str, documents: List[Dict[str, Any]]):
        raise NotImplementedError("Meilisearch integration not yet implemented.")

    def search(
        self,
        index_name: str,
        query: str,
        filters: Any = None,
        pagination: Any = None,
        ranking: Any = None,
    ) -> Dict[str, Any]:
        raise NotImplementedError("Meilisearch integration not yet implemented.")
