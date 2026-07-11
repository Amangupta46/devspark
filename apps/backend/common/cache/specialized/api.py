import hashlib
import json
from typing import Any, Dict, Optional

from ..managers import RedisCacheManager
from ..ttl import TTLManager


class APICache:
    """
    Specialized cache for API responses.
    """

    def __init__(self):
        self.manager = RedisCacheManager()
        self.ttl = TTLManager.SHORT

    def _generate_key(self, path: str, query_params: Dict[str, Any]) -> str:
        # Sort query params to ensure consistent keys
        query_str = json.dumps(query_params, sort_keys=True)
        hashed = hashlib.md5(f"{path}?{query_str}".encode("utf-8")).hexdigest()
        return f"api:response:{hashed}"

    def get_response(self, path: str, query_params: Dict[str, Any]) -> Any:
        key = self._generate_key(path, query_params)
        return self.manager.get(key)

    def set_response(
        self, path: str, query_params: Dict[str, Any], response_data: Any, ttl: Optional[int] = None
    ) -> None:
        key = self._generate_key(path, query_params)
        self.manager.set(key, response_data, timeout=ttl or self.ttl)
