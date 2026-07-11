import time
from contextlib import contextmanager

from ..managers import RedisCacheManager


class DistributedLock:
    """
    Foundation for a Distributed Lock using Redis.
    In a real Redis implementation (django-redis), this uses `cache.lock(name)`.
    For abstract compatibility, we implement a basic SETNX structure.
    """

    def __init__(self, name: str, timeout: int = 10, blocking_timeout: int = 5):
        self.name = f"lock:{name}"
        self.timeout = timeout
        self.blocking_timeout = blocking_timeout
        self.manager = RedisCacheManager()
        self._token = None

    def acquire(self) -> bool:
        start_time = time.time()
        while (time.time() - start_time) < self.blocking_timeout:
            # We assume underlying django-redis cache.add() works as SETNX.
            if self.manager.cache.add(self.name, "locked", self.timeout):
                return True
            time.sleep(0.1)
        return False

    def release(self) -> None:
        self.manager.delete(self.name)

    @contextmanager
    def lock(self):
        acquired = self.acquire()
        if not acquired:
            raise TimeoutError(f"Could not acquire lock for {self.name}")
        try:
            yield
        finally:
            self.release()
