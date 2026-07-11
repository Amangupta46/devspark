from django.core.cache import cache


class CacheStatistics:
    """
    Tracks hits, misses, and evictions.
    Currently uses Django's cache backend (Redis) to store these rolling counters.
    In a real-world scenario, these could be flushed to Datadog/Prometheus.
    """

    HIT_KEY = "devspark:cache:stats:hits"
    MISS_KEY = "devspark:cache:stats:misses"

    @staticmethod
    def record_hit():
        try:
            cache.incr(CacheStatistics.HIT_KEY)
        except ValueError:
            cache.set(CacheStatistics.HIT_KEY, 1, timeout=None)

    @staticmethod
    def record_miss():
        try:
            cache.incr(CacheStatistics.MISS_KEY)
        except ValueError:
            cache.set(CacheStatistics.MISS_KEY, 1, timeout=None)

    @staticmethod
    def get_stats() -> dict:
        hits = cache.get(CacheStatistics.HIT_KEY, 0)
        misses = cache.get(CacheStatistics.MISS_KEY, 0)
        total = hits + misses
        hit_ratio = (hits / total * 100) if total > 0 else 0
        return {
            "hits": hits,
            "misses": misses,
            "total_requests": total,
            "hit_ratio_percent": round(hit_ratio, 2),
        }
