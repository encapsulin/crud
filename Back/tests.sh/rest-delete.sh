pwd
source ./passwords.sh

curl -X DELETE $URL?skid=20240915_223557_997 -H "Authorization: $AUTH_TOKEN" 