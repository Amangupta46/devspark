from abc import ABC, abstractmethod
from typing import Any, Optional

from django.core.cache import cache as django_cache

from .stats import CacheStatistics


class BaseCacheManager(ABC):
    """Abstract interface for Cache Managers."""

    @abstractmethod
    def get(self, key: str, default: Any = None) -> Any:
        pass

    @abstractmethod
    def set(self, key: str, value: Any, timeout: Optional[int] = None) -> None:
        pass

    @abstractmethod
    def delete(self, key: str) -> None:
        pass

    @abstractmethod
    def clear(self) -> None:
        pass


class RedisCacheManager(BaseCacheManager):
    """
    Implementation wrapping Django's configured caching framework.
    Assumes CACHES config points to a Redis backend (e.g. django-redis).
    """

    def __init__(self, alias: str = "default"):
        from django.core.cache import caches

        self.cache = caches[alias]

    def get(self, key: str, default: Any = None) -> Any:
        value = self.cache.get(key, default)
        if value is not default:
            CacheStatistics.record_hit()
        else:
            CacheStatistics.record_miss()
        return value

    def set(self, key: str, value: Any, timeout: Optional[int] = None) -> None:
        self.cache.set(key, value, timeout)

    def delete(self, key: str) -> None:
        self.cache.delete(key)

    def clear(self) -> None:
        self.cache.clear()

    def get_many(self, keys: list) -> dict:
        return self.cache.get_many(keys)

    def set_many(self, data: dict, timeout: Optional[int] = None) -> None:
        self.cache.set_many(data, timeout)

    def delete_many(self, keys: list) -> None:
        self.cache.delete_many(keys)


class LocalCacheManager(BaseCacheManager):
    """
    Local memory cache manager for tests or single-node volatility.
    """

    def __init__(self):
        from django.core.cache import caches

        # Assumes a 'locmem' cache is configured, fallback to default
        try:
            self.cache = caches["locmem"]
        except Exception:
            self.cache = django_cache

    def get(self, key: str, default: Any = None) -> Any:
        return self.cache.get(key, default)

    def set(self, key: str, value: Any, timeout: Optional[int] = None) -> None:
        self.cache.set(key, value, timeout)

    def delete(self, key: str) -> None:
        self.cache.delete(key)

    def clear(self) -> None:
        self.cache.clear()
