class CacheKeyBuilder:
    """
    Unified builder to dynamically generate structured cache keys.
    Format: app:module:entity:id
    """

    @staticmethod
    def build(app: str, module: str, entity: str, identifier: str) -> str:
        return f"{app}:{module}:{entity}:{identifier}"

    @staticmethod
    def prefix(app: str, module: str, entity: str = "") -> str:
        """Returns a prefix for bulk matching/invalidation."""
        if entity:
            return f"{app}:{module}:{entity}:*"
        return f"{app}:{module}:*"
