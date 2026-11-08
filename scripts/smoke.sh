# scripts/smoke.sh
set -e
BASE=${1:-http://localhost:3000}
for slug in heart brain lung liver kidney stomach; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/chain?organ=$slug")
  echo "/chain?organ=$slug -> $code"
  [ "$code" = "200" ] || exit 1
done
code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/curator" \
  -H "Content-Type: application/json" -d '{"organSlug":"kidney","question":"肾不好为什么会气短"}')
echo "api -> $code"
[ "$code" = "200" ] || exit 1
echo "smoke ok"
