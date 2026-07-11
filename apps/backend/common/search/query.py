from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class SearchFilters:
    """
    Standardized provider-agnostic search filters.
    """

    exact_matches: Dict[str, Any] = field(default_factory=dict)
    in_lists: Dict[str, List[Any]] = field(default_factory=dict)
    ranges: Dict[str, Dict[str, Any]] = field(
        default_factory=dict
    )  # e.g. {"price": {"gte": 10, "lte": 50}}


@dataclass
class Ranking:
    """
    Standardized definition for sorting and relevance boosting.
    """

    sort_fields: List[str] = field(default_factory=list)  # e.g. ["-created_at", "relevance"]
    boost_fields: Dict[str, float] = field(default_factory=dict)  # e.g. {"title": 2.0}


@dataclass
class Pagination:
    """
    Agnostic pagination logic.
    """

    offset: int = 0
    limit: int = 20
    cursor: Optional[str] = None
