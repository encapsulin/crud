pwd
source ./passwords.sh

for i in {1..1000}; do
    strDT=$(date +'%Y%m%d-%H%M%S')
    strDT="${strDT}.${i}"
# strDT="20241003-203917.196"
     echo $strDT


curl -X POST $URL \
-H "Content-Type: application/json" \
-H "Authorization: $AUTH_TOKEN" \
-d "{\"parent\":\"20241005_114104_144\",\"role\":\"doc\",\"descr\":\"Dir3 $strDT\",\"title\":\"$strDT\",\"skid\":\"0\"}"

sleep 1
done