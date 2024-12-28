const tableName = 'tbCrud';

import { DynamoDBClient, DynamoDB } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    // ScanCommand, // not recommended
    // GetCommand, // ?
    PutCommand,
    DeleteCommand,
    UpdateCommand,
    QueryCommand
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const dynamoClient = DynamoDBDocumentClient.from(client);
const dynamo = new DynamoDB();

const params = {
    Statement: `
        SELECT * FROM "tbCrud"."titleLower-index" 
        WHERE "pkid" = '0' AND CONTAINS("titleLower", '2024') 
    `,
    Limit: 3
};

dynamo.executeStatement(params, (err, data) => {
    if (err) {
        console.error("Error executing statement:", err);
    } else {
        console.log("Query results:", data);
    }
});