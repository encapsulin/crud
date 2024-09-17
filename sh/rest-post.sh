source ./sh/cfg.sh
 
curl -X POST $URL \
-H "Content-Type: application/json" \
-d '{"title":"v1","descr":"","role":"doc","parent":"20240917_101722_493"}'
