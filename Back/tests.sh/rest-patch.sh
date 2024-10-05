pwd
source ./passwords.sh

curl -X PATCH $URL?skid=20240915_231828_202 \
-H "Content-Type: application/json" \
-d '{"title":"value", "descr":"value"}'