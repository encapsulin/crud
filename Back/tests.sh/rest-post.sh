pwd
fn=../../passwords.sh
ls -l $fn
source $fn
ldtStart=$(date)
echo $ldtStart

for i in {1..300}; do
    strDT=$(date +'%Y%m%d-%H%M%S')
    strDT="${strDT}.${i}"
# strDT="20241003-203917.196"
     echo -e "\n" $strDT


response=$(curl -X POST $URL \
-H "Content-Type: application/json" \
-H "Authorization: $AUTH_TOKEN" \
-d "{\"parent\":\"20241006_104134_256\",\"role\":\"doc\",\"descr\":\"Dir3 $strDT\",\"title\":\"$strDT\",\"skid\":\"0\"}" \
)

echo $response
if echo "$response" | grep -q "data is not defined"; then
    sleep 2
fi

done

echo $ldtStart
date