#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Verify .env exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Please create a .env file from example.env"
    exit 1
fi

echo "🚀 Starting safe build process..."

# Stop all running containers related to this compose file
echo "🛑 Stopping running containers..."
docker compose down --remove-orphans

# Build the services
# --no-cache: Ensures we rebuild from scratch (safest, but slower)
# --pull: Always pull the latest versions of the base images
echo "🏗️  Building images (this may take a while)..."
docker compose build --no-cache --pull

# Start the services
echo "▶️  Starting services..."
docker compose up -d

# Check health
echo "🏥 Checking service status..."
docker compose ps

# Cleanup dangling images (optional, helps save space)
echo "🧹 Cleaning up dangling images..."
docker image prune -f

echo "✨ Build and startup complete!"
