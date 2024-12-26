package com.encaps.aws.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

import java.util.HashMap;

public interface ItemDelete {
    default void deleteDynamoDBItem(DynamoDbClient ddb, String tableName, String key, Object keyVal) {
        HashMap<String, AttributeValue> keyToGet = new HashMap<>();
//        keyToGet.put(key, AttributeValue.builder()
//                .s(keyVal)
//                .build());
        AttributeValue.Builder builder = AttributeValue.builder();
        if(keyVal instanceof String)
            builder.s((String)keyVal);
        else if(keyVal instanceof Number)
            builder.n(String.valueOf(keyVal));

        keyToGet.put(key, builder.build());

        DeleteItemRequest deleteReq = DeleteItemRequest.builder()
                .tableName(tableName)
                .key(keyToGet)
                .build();

        try {
            ddb.deleteItem(deleteReq);
        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }
}
