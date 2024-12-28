cd "$(dirname "$0")" ;\
cd aws ;\
rm -fr node_modules/@* ;\
rm -f ../export.zip ; zip -r ../export.zip index.mjs fn* config* node_modules ;\
aws lambda update-function-code \
--function-name fnDomkuh \
--zip-file fileb://../export.zip
#npm install
#rm -f ../crud.zip 
