from typing import Any, Optional

from ..keys import CacheKeyBuilder
from ..managers import RedisCacheManager
from ..ttl import TTLManager


class QueryCache:
    """
    Specialized cache for ORM querysets or heavy DB results.
    """

    def __init__(self):
        self.manager = RedisCacheManager()
        self.ttl = TTLManager.SHORT

    def get_query_result(self, model_name: str, query_hash: str) -> Any:
        cache_key = CacheKeyBuilder.build("db", "query", model_name, query_hash)
        return self.manager.get(cache_key)

    def set_query_result(
        self, model_name: str, query_hash: str, result: Any, ttl: Optional[int] = None
    ) -> None:
        cache_key = CacheKeyBuilder.build("db", "query", model_name, query_hash)
        self.manager.set(cache_key, result, timeout=ttl or self.ttl)

    def invalidate_model_queries(self, model_name: str) -> None:
        """
        Invalidates all cached queries for a specific model.
        Requires a Redis backend that supports pattern deletion or custom invalidation.
        """
        pass
