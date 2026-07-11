from typing import Any, Optional

from ..keys import CacheKeyBuilder
from ..managers import RedisCacheManager
from ..ttl import TTLManager


class SessionCache:
    """
    Specialized cache wrapper for session data.
    """

    def __init__(self):
        self.manager = RedisCacheManager()
        self.ttl = TTLManager.MEDIUM

    def get_session_data(self, session_id: str, key: str) -> Any:
        cache_key = CacheKeyBuilder.build("auth", "session", session_id, key)
        return self.manager.get(cache_key)

    def set_session_data(
        self, session_id: str, key: str, value: Any, ttl: Optional[int] = None
    ) -> None:
        cache_key = CacheKeyBuilder.build("auth", "session", session_id, key)
        self.manager.set(cache_key, value, timeout=ttl or self.ttl)

    def clear_session(self, session_id: str) -> None:
        # In a real Redis scenario with django-redis, you can use `.delete_pattern()`
        # For abstraction, we could also track session keys or use prefix deletion if supported.
        pass
