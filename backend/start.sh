#!/bin/sh

# Wait for database to be ready and run migrations
echo "Running database migrations..."
bun db:migrate

# Start the application
echo "Starting application..."
bun prod
