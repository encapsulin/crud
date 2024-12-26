#curl  http://localhost:8080/api/nodes/get/1
curl -X PATCH http://localhost:8080/api/nodes/patch \
   -H "Content-Type: application/json" \
   -d '{"id":"1","title":"A"}'

echo -e "\n\n***\n"

curl -X PATCH http://localhost:8080/api/nodes/patch \
  -H "Content-Type: application/json" \
  -d '{"id":"1","title":"B"}'