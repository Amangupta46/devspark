from abc import ABC, abstractmethod
from typing import Any, Dict, List


class SearchIndex(ABC):
    """
    Blueprint for defining how a specific model/entity maps to a search document.
    """

    index_name: str

    @abstractmethod
    def get_document_id(self, instance: Any) -> str:
        pass

    @abstractmethod
    def serialize_document(self, instance: Any) -> Dict[str, Any]:
        """Convert an instance into a flat dictionary for search engines."""
        pass


class SearchProvider(ABC):
    """
    Abstract Base Class defining the contract for any search engine.
    """

    @abstractmethod
    def index_document(self, index_name: str, doc_id: str, document: Dict[str, Any]):
        pass

    @abstractmethod
    def delete_document(self, index_name: str, doc_id: str):
        pass

    @abstractmethod
    def bulk_index(self, index_name: str, documents: List[Dict[str, Any]]):
        pass

    @abstractmethod
    def search(
        self,
        index_name: str,
        query: str,
        filters: Any = None,
        pagination: Any = None,
        ranking: Any = None,
    ) -> Dict[str, Any]:
        """
        Executes a search query.
        Returns a dictionary containing 'results', 'total', etc.
        """
        pass
