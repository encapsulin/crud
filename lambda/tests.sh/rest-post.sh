pwd
source ./lambda/tests.sh/config.sh
 
for i in {1..3}; do
    strDT=$(date +'%Y%m%d-%H%M%S')
    strDT="${strDT}.${i}"
# strDT="20241003-203917.196"
     echo $strDT


curl -X POST $URL \
-H "Content-Type: application/json" \
-H "Authorization: 46068b06-db78-46dc-b929-9109185278b4" \
-d "{\"parent\":\"20241004_204843_611\",\"role\":\"doc\",\"descr\":\"Dir2-$strDT\",\"title\":\"$strDT\",\"skid\":\"0\"}"

done