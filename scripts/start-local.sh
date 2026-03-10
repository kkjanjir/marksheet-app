#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"
echo "Starting marksheet app on http://0.0.0.0:${PORT}/index.html"
python3 -m http.server "$PORT"
