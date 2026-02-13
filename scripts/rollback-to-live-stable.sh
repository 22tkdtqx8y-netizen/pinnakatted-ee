#!/usr/bin/env bash
# Rollback live pinnakatted.ee eelmise (töötava) versiooni peale.
# Eeldus: enne uue versiooni deploy't on loodud tag live-stable (vt docs/DEPLOY-JA-ROLLBACK.md).

set -e

TAG="${LIVE_STABLE_TAG:-live-stable}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if ! git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Viga: tag '$TAG' puudub. Loo enne uue versiooni deploy't: git tag live-stable <commit-praegu-live-il>"
  echo "Vaata: docs/DEPLOY-JA-ROLLBACK.md"
  exit 1
fi

echo "→ Tõmban tagasi versioonile: $TAG"
git checkout "$TAG"
echo "→ Build..."
npm run build
echo "→ Deploy Cloudflare'i..."
npx wrangler deploy
echo "→ Valmis. Live on nüüd tagasi versioonil $TAG."
echo "→ Töötava koodi juurde tagasi: git checkout main  (või oma haru)."
git checkout -
