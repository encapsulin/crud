package com.encaps.aws.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public interface ItemGet {
    default void getDynamoDBItem(DynamoDbClient ddb, String tableName, String key, Object keyVal) {

        HashMap<String, AttributeValue> keyToGet = new HashMap<>();

        AttributeValue.Builder builder = AttributeValue.builder();
        if(keyVal instanceof String)
            builder.s((String)keyVal);
        else if(keyVal instanceof Integer)
            builder.n(String.valueOf(keyVal));

        keyToGet.put(key, builder.build());

        GetItemRequest request = GetItemRequest.builder()
                .key(keyToGet)
                .tableName(tableName)
                .build();

        try {
            Map<String, AttributeValue> returnedItem = ddb.getItem(request).item();
            if (returnedItem != null) {
                Set<String> keys = returnedItem.keySet();
                System.out.println("Amazon DynamoDB table attributes: \n");

                for (String key1 : keys) {
                    System.out.format("%s: %s\n", key1, returnedItem.get(key1).toString());
                }
            } else {
                System.out.format("No item found with the key %s!\n", key);
            }

        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
//            System.exit(1);
        }
    }
}
