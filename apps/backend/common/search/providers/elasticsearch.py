from typing import Any, Dict, List

from ..interfaces import SearchProvider


class ElasticsearchProvider(SearchProvider):
    """
    Elasticsearch provider abstraction stub.
    """

    def __init__(self, hosts: List[str], **kwargs):
        self.hosts = hosts
        self.client = None  # Future: elasticsearch.Elasticsearch(hosts, **kwargs)

    def index_document(self, index_name: str, doc_id: str, document: Dict[str, Any]):
        raise NotImplementedError("Elasticsearch integration not yet implemented.")

    def delete_document(self, index_name: str, doc_id: str):
        raise NotImplementedError("Elasticsearch integration not yet implemented.")

    def bulk_index(self, index_name: str, documents: List[Dict[str, Any]]):
        raise NotImplementedError("Elasticsearch integration not yet implemented.")

    def search(
        self,
        index_name: str,
        query: str,
        filters: Any = None,
        pagination: Any = None,
        ranking: Any = None,
    ) -> Dict[str, Any]:
        raise NotImplementedError("Elasticsearch integration not yet implemented.")
