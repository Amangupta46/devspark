from .base import env

# Use dj-database-url format string: DATABASE_URL=postgres://user:password@host:port/dbname
DATABASES = {"default": env.db("DATABASE_URL", default="sqlite:///db.sqlite3")}

# Ensure connection pooling settings (if using PgBouncer) or standard Django CONN_MAX_AGE
DATABASES["default"]["CONN_MAX_AGE"] = env.int("CONN_MAX_AGE", default=60)
