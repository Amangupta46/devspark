from typing import Any, Dict, List, Optional

from .interfaces import SearchIndex, SearchProvider
from .providers.local import LocalSearchProvider
from .query import Pagination, Ranking, SearchFilters


class SearchRegistry:
    """
    Central registry for managing searchable indices.
    """

    _indices: Dict[str, SearchIndex] = {}

    @classmethod
    def register(cls, index: SearchIndex):
        cls._indices[index.index_name] = index

    @classmethod
    def get_index(cls, index_name: str) -> SearchIndex:
        return cls._indices.get(index_name)

    @classmethod
    def get_all_indices(cls) -> List[SearchIndex]:
        return list(cls._indices.values())


class GlobalSearch:
    """
    Main orchestrator for performing searches across multiple indices.
    """

    def __init__(self, provider: Optional[SearchProvider] = None):
        # Fallback to local search if no provider is injected
        self.provider = provider or LocalSearchProvider()

    def search(
        self,
        query: str,
        indices: Optional[List[str]] = None,
        filters: Optional[SearchFilters] = None,
        pagination: Optional[Pagination] = None,
        ranking: Optional[Ranking] = None,
    ) -> Dict[str, List[Dict[str, Any]]]:
        """
        Executes a global search across specified indices (or all if None).
        Returns results grouped by index_name.
        """
        target_indices = indices if indices else list(SearchRegistry._indices.keys())
        grouped_results = {}

        # In a real environment, this could be parallelized via asyncio or threads
        for index_name in target_indices:
            result = self.provider.search(
                index_name=index_name,
                query=query,
                filters=filters,
                pagination=pagination,
                ranking=ranking,
            )
            grouped_results[index_name] = result.get("results", [])

        return grouped_results

    def index_document(self, index_name: str, instance: Any):
        index = SearchRegistry.get_index(index_name)
        if not index:
            raise ValueError(f"Index {index_name} not registered.")

        doc_id = index.get_document_id(instance)
        document = index.serialize_document(instance)
        self.provider.index_document(index_name, doc_id, document)
