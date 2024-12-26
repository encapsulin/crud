package com.encaps.aws;

import com.encaps.aws.dynamodb.DynamoDB;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.json.JsonTest;

import java.time.LocalDateTime;

@JsonTest
public class TestDynamoDB {

    @Value("${aws.accessKeyId}")
    private String accessKeyId;
    @Value("${aws.secretAccessKey}")
    private String secretAccessKey;

    DynamoDB dynamoDB;
    final String TABLE_NAME = "Node";

    @BeforeEach
    void setUp() {
        dynamoDB = new DynamoDB(new CredentialsProvider(accessKeyId, secretAccessKey));
    }

    @Test
    void testlistAllTables() {
        dynamoDB.listAllTables(dynamoDB.getClient());
        dynamoDB.close();
    }

    @Test
    void putItemInTable() {
        dynamoDB.putItemInTable(dynamoDB.getClient(), TABLE_NAME,
                "id", 1,
                "title", "ROOT",
                "parentId", "0",
                "updatedAt", LocalDateTime.now().toString()
        );
        dynamoDB.close();
    }

    @Test
    void putItemInTable2() {
        dynamoDB.putItemInTable(dynamoDB.getClient(), TABLE_NAME,
                "id", 1,
                "title", "ROOT",
                "parentId", "0",
                "updatedAt", LocalDateTime.now().toString()
        );
        dynamoDB.close();
    }

    @Test
    void getDynamoDBItem() {
        dynamoDB.getDynamoDBItem(dynamoDB.getClient(), TABLE_NAME,
                "id", 1
        );
        dynamoDB.close();
    }

    @Test
    void deleteDynamoDBItem() {
        dynamoDB.deleteDynamoDBItem(dynamoDB.getClient(), TABLE_NAME,
                "id", 1
        );
        dynamoDB.close();
    }

    @Test
    void testScanItems() {
        var list = dynamoDB.scanItems(dynamoDB.getClient(), TABLE_NAME

                );
        System.out.println(list);
    }
}
