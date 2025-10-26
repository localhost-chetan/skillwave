#!/bin/sh

# Wait for database to be ready and run migrations
# Database only becomes available during the runtime phase (when containers are actually running).
# Ensure your start.sh runs migrations before starting the app
# This way, migrations run when the container starts (after depends_on ensures postgres is healthy), not during the build when the database doesn't exist yet.
echo "Running database migrations..."
bun db:migrate

# Start the application
echo "Starting application..."
bun prod
