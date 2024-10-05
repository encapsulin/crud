SourceTableName=tbCrud2
TargetTableName=tbCrud

aws dynamodb scan --table-name $SourceTableName --output json > $SourceTableName.json

cat $SourceTableName.json | jq -c '.Items[]' | while read item; do
  aws dynamodb put-item --table-name $TargetTableName --item "$item"
done
