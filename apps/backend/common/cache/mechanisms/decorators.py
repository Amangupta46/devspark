from functools import wraps
from typing import Callable

from ..managers import RedisCacheManager
from ..ttl import TTLManager


def cached(key_prefix: str, ttl: int = TTLManager.SHORT):
    """
    Generic decorator to cache the result of a function.
    Appends function arguments to the key to prevent collisions.
    """

    def decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            manager = RedisCacheManager()

            # Simple stringification of args/kwargs for key uniqueness
            args_str = "_".join([str(a) for a in args])
            kwargs_str = "_".join([f"{k}={v}" for k, v in sorted(kwargs.items())])

            cache_key = f"{key_prefix}:{func.__name__}:{args_str}:{kwargs_str}"

            result = manager.get(cache_key)
            if result is not None:
                return result

            result = func(*args, **kwargs)
            manager.set(cache_key, result, timeout=ttl)
            return result

        return wrapper

    return decorator


def cached_api_response(ttl: int = TTLManager.SHORT):
    """
    Decorator designed specifically for caching Django Rest Framework or similar API views.
    Expects `request` as the first argument after `self` (if a method) or first arg (if a function).
    """

    def decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            from ..specialized.api import APICache

            api_cache = APICache()

            # Try to extract request
            request = None
            for arg in args:
                if hasattr(arg, "path") and hasattr(arg, "GET"):
                    request = arg
                    break

            if not request:
                # Fallback if no request object found
                return func(*args, **kwargs)

            cached_resp = api_cache.get_response(request.path, dict(request.GET))
            if cached_resp is not None:
                return cached_resp

            response = func(*args, **kwargs)
            # Typically you'd only cache 200 OK
            if hasattr(response, "status_code") and response.status_code == 200:
                # If it's a DRF Response, we might need to render it first,
                # but for abstraction, we assume it's serializable.
                api_cache.set_response(request.path, dict(request.GET), response, ttl)

            return response

        return wrapper

    return decorator
