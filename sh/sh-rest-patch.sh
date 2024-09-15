source ./cfg.sh

curl -X PATCH $URL \
-H "Content-Type: application/json" \
-d '{"title":"value1", "descr":"value2"}'