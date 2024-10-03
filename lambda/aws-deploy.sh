pwd
cd lambda/src

rm -f ../crud.zip ; zip -r ../crud.zip index.mjs fn_*
# ls -alrt; date

aws lambda update-function-code \
--function-name fnCrud \
--zip-file fileb://../crud.zip
