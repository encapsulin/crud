package com.encaps.aws.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.HashMap;

public interface ItemPutInTable {
    default void putItemInTable(DynamoDbClient ddb,
                               String tableName,
                               String key,
                               Object keyVal,
                               String albumTitle,
                               String albumTitleValue,
                               String awards,
                               String awardVal,
                               String songTitle,
                               String songTitleVal) {

        HashMap<String, AttributeValue> itemValues = new HashMap<>();

        AttributeValue.Builder builder = AttributeValue.builder();
        if(keyVal instanceof String)
            builder.s((String)keyVal);
        else if(keyVal instanceof Integer)
            builder.n(String.valueOf(keyVal));

        itemValues.put(key, builder.build());
        itemValues.put(songTitle, AttributeValue.builder().s(songTitleVal).build());
        itemValues.put(albumTitle, AttributeValue.builder().s(albumTitleValue).build());
        itemValues.put(awards, AttributeValue.builder().s(awardVal).build());

        PutItemRequest request = PutItemRequest.builder()
                .tableName(tableName)
                .item(itemValues)
                .build();

        try {
            PutItemResponse response = ddb.putItem(request);
            System.out.println(tableName + " was successfully updated. The request id is " + response.responseMetadata().requestId());

        } catch (ResourceNotFoundException e) {
            System.err.format("Error: The Amazon DynamoDB table \"%s\" can't be found.\n", tableName);
            System.err.println("Be sure that it exists and that you've typed its name correctly!");
            System.exit(1);
        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
//            System.exit(1);
        }
    }
}
