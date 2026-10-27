#!/bin/bash
# Local build & deploy script for Next.js static export
# Usage: ./scripts/deploy.sh [local|ftp]

set -euo pipefail

MODE="${1:-local}"
BUILD_DIR="out"

echo "🚀 Starting build & deploy..."
echo "   Mode: $MODE"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --no-audit --no-fund

# Build the app
echo "🔨 Building Next.js app (static export)..."
npm run build

# Verify build output
if [ ! -d "$BUILD_DIR" ] || [ -z "$(ls -A $BUILD_DIR 2>/dev/null)" ]; then
  echo "❌ Build failed: '$BUILD_DIR' directory is empty or missing"
  exit 1
fi

echo "✅ Build successful. Output files:"
ls -la "$BUILD_DIR/"

if [ "$MODE" = "ftp" ]; then
  echo "📤 Deploying to FTP hosting..."
  lftp -u "$FTP_USER", "$FTP_PASSWORD" -e "mirror -R $BUILD_DIR/ $FTP_TARGET; quit" "$FTP_HOST"
  echo "✅ Deployment complete!"
else
  echo "📁 Local build complete. Files ready in 'out/' directory."
  echo "   You can test it locally with: python -m http.server 3000 -d out"
  echo ""
  echo "   To deploy to FTP, run: ./scripts/deploy.sh ftp"
fi
