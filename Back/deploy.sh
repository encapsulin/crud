pwd
cd ./Back/src
rm -fr node_modules/@*
rm -f ../crud.zip ; zip -r ../crud.zip index.mjs fn* config* node_modules
# ls -alrt; date

aws lambda update-function-code \
--function-name fnCrud \
--zip-file fileb://../crud.zip

npm install
