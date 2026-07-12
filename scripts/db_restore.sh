#!/bin/bash
# scripts/db_restore.sh
# Restores a backup of the PostgreSQL database.

set -e

if [ -z "$1" ]; then
  echo "Usage: ./db_restore.sh <path_to_backup_file>"
  exit 1
fi

BACKUP_FILE=$1
CONTAINER_NAME="devspark_postgres"
DB_USER="devspark"
DB_NAME="devsparkdb"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found!"
  exit 1
fi

echo "Copying backup to container..."
docker cp ${BACKUP_FILE} ${CONTAINER_NAME}:/tmp/db_restore.dump

echo "Restoring database..."
docker exec -t ${CONTAINER_NAME} pg_restore -U ${DB_USER} -d ${DB_NAME} --clean --if-exists /tmp/db_restore.dump
docker exec -t ${CONTAINER_NAME} rm /tmp/db_restore.dump

echo "Restore completed successfully."
