source ./cfg.sh

curl -X PUT $URL \
-H "Content-Type: application/json" \
-d '{"key1":"value1", "key2":"value2"}'