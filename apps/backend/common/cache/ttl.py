class TTLManager:
    """
    Standardizes TTL presets across all modules in DevSpark to prevent
    arbitrary TTL assignments and enforce caching policies.
    """

    TINY = 60  # 1 minute (for volatile counters/locks)
    SHORT = 300  # 5 minutes (for frequently changing data)
    MEDIUM = 3600  # 1 hour (for user sessions or semi-static content)
    LONG = 86400  # 24 hours (for mostly static config/metadata)
    MAX = 604800  # 1 week (for immutable historical data)

    @staticmethod
    def get_ttl(preset: str) -> int:
        return getattr(TTLManager, preset.upper(), TTLManager.SHORT)
