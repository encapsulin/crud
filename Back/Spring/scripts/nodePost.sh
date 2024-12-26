#curl -X POST http://localhost:8080/items/post \
# -H "Content-Type: application/json" \
#-d @./item.json

http POST http://localhost:8080/api/nodes/post < ./nodes.json

