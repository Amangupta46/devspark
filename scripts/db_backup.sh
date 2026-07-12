#!/bin/bash
# scripts/db_backup.sh
# Creates a backup of the PostgreSQL database using pg_dump.

set -e

CONTAINER_NAME="devspark_postgres"
DB_USER="devspark"
DB_NAME="devsparkdb"

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/devspark_backup_${TIMESTAMP}.sql"

mkdir -p ${BACKUP_DIR}

echo "Starting database backup..."
docker exec -t ${CONTAINER_NAME} pg_dump -U ${DB_USER} -d ${DB_NAME} -F c -f /tmp/db_backup.dump
docker cp ${CONTAINER_NAME}:/tmp/db_backup.dump ${BACKUP_FILE}
docker exec -t ${CONTAINER_NAME} rm /tmp/db_backup.dump

echo "Backup completed successfully: ${BACKUP_FILE}"
