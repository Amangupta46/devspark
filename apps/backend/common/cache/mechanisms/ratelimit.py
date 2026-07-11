from ..managers import RedisCacheManager


class RateLimiter:
    """
    Foundation for Rate Limiting.
    Implements a simple fixed-window counter.
    For sliding window, a Redis sorted set is recommended.
    """

    def __init__(self, key_prefix: str, limit: int, period: int):
        self.key_prefix = key_prefix
        self.limit = limit
        self.period = period
        self.manager = RedisCacheManager()

    def is_allowed(self, identifier: str) -> bool:
        """
        Check if the identifier has exceeded the rate limit.
        """
        key = f"ratelimit:{self.key_prefix}:{identifier}"
        try:
            current = self.manager.cache.incr(key)
        except ValueError:
            # Key doesn't exist yet
            self.manager.set(key, 1, timeout=self.period)
            return True

        if current > self.limit:
            return False

        return True
