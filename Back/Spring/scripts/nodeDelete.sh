curl  http://localhost:8080/api/nodes/get/2
echo -e "\n\n***\n"

curl -X DELETE http://localhost:8080/api/nodes/del/2
echo -e "\n\n***\n"

curl  http://localhost:8080/api/nodes/get/2
