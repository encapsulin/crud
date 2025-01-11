cd "$(dirname "$0")"; pwd
source ./url.sh

curl -X GET "$URL?role=doc"

#curl -X GET "$URL?filter=role&filterVal=doc"

#curl -X GET "$URL?search=asdf"

#   queryStringParameters: { parent: '', role: 'doc' },
#   multiValueQueryStringParameters: { parent: [ '' ], role: [ 'doc' ] },

# curl -X GET "$URL?filter=doc|cat"
#   queryStringParameters: { filter: 'doc|cat' },
#   multiValueQueryStringParameters: { filter: [ 'doc|cat' ] },

# curl -X GET "$URL?filter=doc,cat"
#   queryStringParameters: { filter: 'doc,cat' },
#   multiValueQueryStringParameters: { filter: [ 'doc,cat' ] },

# curl -X GET "$URL?filter[]=role:doc&filter[]=parent:0"
#   queryStringParameters: { 'filter[]': 'parent:0' },
#   multiValueQueryStringParameters: { 'filter[]': [ 'role:doc', 'parent:0' ] },

#curl -X GET "$URL?filter=role:doc&filter=cat:0"
#   queryStringParameters: { filter: 'cat:0' },
#   multiValueQueryStringParameters: { filter: [ 'role:doc', 'cat:0' ] },

#curl -X GET $URL?skid=20240915_231828_2020

