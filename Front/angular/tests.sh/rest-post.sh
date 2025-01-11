cd "$(dirname "$0")"; pwd
source ./url.sh
curl -X POST $URL \
-H "Origin: http://localhost:4200" \
-H "Content-Type: application/json" \
-d '{"skid":"","title":"New Item","descr":"Description","price":"10/100","img":"img/8.jpeg","role":"doc"}' -i
