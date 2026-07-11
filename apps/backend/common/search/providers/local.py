from typing import Any, Dict, List

from ..interfaces import SearchProvider


class LocalSearchProvider(SearchProvider):
    """
    Fallback search provider using simple in-memory filtering.
    For local development when Elasticsearch/Meilisearch is unavailable.
    """

    def __init__(self):
        # Format: {"index_name": {"doc_id": {document_data}}}
        self._store: Dict[str, Dict[str, Dict[str, Any]]] = {}

    def index_document(self, index_name: str, doc_id: str, document: Dict[str, Any]):
        if index_name not in self._store:
            self._store[index_name] = {}
        self._store[index_name][doc_id] = document

    def delete_document(self, index_name: str, doc_id: str):
        if index_name in self._store and doc_id in self._store[index_name]:
            del self._store[index_name][doc_id]

    def bulk_index(self, index_name: str, documents: List[Dict[str, Any]]):
        for doc in documents:
            doc_id = doc.get("id")
            if doc_id:
                self.index_document(index_name, str(doc_id), doc)

    def search(
        self,
        index_name: str,
        query: str,
        filters: Any = None,
        pagination: Any = None,
        ranking: Any = None,
    ) -> Dict[str, Any]:
        if index_name not in self._store:
            return {"results": [], "total": 0}

        results = []
        query_lower = query.lower()

        # Basic text search across all string fields
        for doc_id, doc in self._store[index_name].items():
            if not query:
                results.append(doc)
                continue

            for key, value in doc.items():
                if isinstance(value, str) and query_lower in value.lower():
                    results.append(doc)
                    break

        # Pagination application
        total = len(results)
        if pagination:
            start = pagination.offset
            end = start + pagination.limit
            results = results[start:end]

        return {"results": results, "total": total}
