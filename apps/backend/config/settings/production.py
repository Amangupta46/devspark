# ruff: noqa: F403, F405
from .base import *
from .cache import *
from .celery import *
from .database import *
from .drf import *
from .email import *
from .logging import *
from .security import *
from .storage import *

DEBUG = False

# Production specific security overrides
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 60  # Set to a proper value like 31536000 (1 year) in real prod
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)
SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)
