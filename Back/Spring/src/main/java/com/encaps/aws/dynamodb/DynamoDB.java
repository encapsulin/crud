package com.encaps.aws.dynamodb;

import com.encaps.aws.CredentialsProvider;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

public class DynamoDB implements
        ListAllTables,
        ItemPutInTable,
        ItemUpdate,
        ItemDelete,
        ItemGet,
        ScanItems {

    DynamoDbClient ddb;
    DynamoDbEnhancedClient enhancedClient;

    public DynamoDB() {

    }

    public DynamoDB(CredentialsProvider provider) {
        this.ddb = getClientByCredentialsProvider(provider);

        enhancedClient = DynamoDbEnhancedClient.builder()
                .dynamoDbClient(this.ddb)
                .build();
    }

    public DynamoDbClient getClientByCredentialsProvider(CredentialsProvider provider) {

        DynamoDbClient client = DynamoDbClient.builder()
//                .endpointOverride(URI.create("http://localhost:8000"))
                // The region is meaningless for local DynamoDb but required for client builder validation
                .region(provider.getRegion())
                .credentialsProvider(provider.getCredentialsProvider())
                .build();
        return client;
    }

    public DynamoDbClient getClient() {
        return ddb;
    }

    public DynamoDbEnhancedClient getEnhancedClient() {
        return enhancedClient;
    }

    public void close() {
        ddb.close();
    }


}
