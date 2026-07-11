from typing import List

from ..managers import RedisCacheManager


class CacheInvalidator:
    """
    Handles bulk invalidation of cache entries.
    """

    def __init__(self):
        self.manager = RedisCacheManager()

    def invalidate_exact(self, keys: List[str]) -> None:
        """
        Invalidates a specific list of exact keys.
        """
        self.manager.delete_many(keys)

    def invalidate_prefix(self, prefix: str) -> None:
        """
        Invalidates all keys matching a prefix.
        Requires django-redis `delete_pattern` or equivalent.
        For standard django cache, this is not supported out of the box without tracking keys.
        We provide a best-effort abstract implementation.
        """
        if hasattr(self.manager.cache, "delete_pattern"):
            self.manager.cache.delete_pattern(f"{prefix}*")
        else:
            # Fallback: if backend doesn't support wildcard deletion,
            # this method is a no-op unless key tracking is implemented.
            pass


def invalidate_cache(keys: List[str] = None, prefix: str = None):
    """
    Decorator to invalidate specific keys or prefixes AFTER a function completes successfully.
    """

    def decorator(func):
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)

            invalidator = CacheInvalidator()
            if keys:
                invalidator.invalidate_exact(keys)
            if prefix:
                invalidator.invalidate_prefix(prefix)

            return result

        return wrapper

    return decorator
