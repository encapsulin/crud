pwd
source ./lambda/tests.sh/config.sh
 
for i in {1..10}; do
    strDT=$(date +'%Y%m%d-%H%M%S')
    strDT="${strDT}.${i}"
# strDT="20241003-203917.196"
     echo $strDT


curl -X POST $URL \
-H "Content-Type: application/json" \
-H "Authorization: 46068b06-db78-46dc-b929-9109185278b4" \
-d "{\"parent\":\"20240929_160937_354\",\"role\":\"doc\",\"descr\":\"$strDT\",\"title\":\"$strDT\",\"skid\":\"0\"}"

done