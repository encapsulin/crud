package com.encaps.aws.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanResponse;

import java.util.*;

public interface ScanItems {
    default List<Map<String,String>> scanItems(DynamoDbClient ddb, String tableName ){
        var map = new HashMap<String,String>();
        var list = new ArrayList<Map<String,String>>();

        var expressionAttributeNames = new HashMap<String, String>();
        expressionAttributeNames.put("#pn", "role");
        var expressionAttributeValues = new HashMap<String, AttributeValue>();
        expressionAttributeValues.put(":pv", AttributeValue.fromN("1"));

        ScanRequest scanRequest = ScanRequest.builder()
                .tableName(tableName)
                .filterExpression("#pn = :pv")
                .expressionAttributeNames(expressionAttributeNames)
                .expressionAttributeValues(expressionAttributeValues)
                .build();

        ScanResponse response = ddb.scan(scanRequest);
        for (Map<String, AttributeValue> item : response.items()) {
            Set<String> keys = item.keySet();
            for (String key : keys) {
                System.out.println (key +": " + item.get(key).s());
                System.out.println (key +": " + item.get(key).n());
            }
        }
        return list;
    }
}
