// import { DynamoDB } from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
// const dynamo = DynamoDBDocument.from(new DynamoDB());

import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    // ScanCommand, //not recommended
    PutCommand,
    GetCommand,
    DeleteCommand,
    UpdateCommand,
    QueryCommand
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'tbCrud2';

////////////////////////////////////////////////
export const dynamo_send = async (command) => {
    try {
        console.log("dynamo_send()");
        //console.log(command);
        const data = await dynamo.send(command);
        console.log("data:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        //console.log("asdf 41");
    }
};

/////////////////////////////////////////////////
export const fnDynamoQuery = async (params_) => {
    let params = {
        TableName: tableName,
        ScanIndexForward: false,
        KeyConditionExpression: "pkid = :pkidv AND skid >= :skidv",
        ExpressionAttributeValues: {
            ":pkidv": "0",
            ":skidv": "0"
        }
    };
    if (params_ !== null && params_.skid !== undefined) {
        params.KeyConditionExpression = "pkid = :pkidv AND skid = :skidv"
        params.ExpressionAttributeValues = {
            ":pkidv": "0",
            ":skidv": params_.skid
        }
    }

    console.log("fnDynamoQuery():", params);
    const command = new QueryCommand(params);
    const data = await dynamo_send(command);
    return {
        statusCode: data.$metadata.httpStatusCode,
        data: data.Items
    };
};

/////////////////////////////////////////////
export const fnDynamoPut = async (item) => {
    console.log("fnDynamoPut():", item);

    item.skid = fnDateToIso(fnDatePlusDHM(new Date(), 0, 2));
    item.pkid = "0";

    const params = {
        TableName: tableName,
        Item: item
    };

    const command = new PutCommand(params);
    const data = await dynamo_send(command);
    return {
        statusCode: data.$metadata.httpStatusCode,
        skid: item.skid
    };

};

/////////////////////////////////////////////////
export const fnDynamoDelete = async (skid) => {
    console.log("fnDynamoDelete():", skid);
    const params = {
        TableName: tableName,    // Replace with your DynamoDB table name
        Key: {
            // Replace with the primary key of the item you want to delete
            "pkid": "0",
            // If your table has a composite key (PartitionKey and SortKey), add the SortKey here:
            "skid": skid
        },
        // Optional: You can add a condition expression if needed
        // ConditionExpression: "attribute_exists(PrimaryKeyAttribute)"
        //ScanIndexForward: false
    };

    const command = new DeleteCommand(params);
    const data = await dynamo_send(command);
    return {
        statusCode: data.$metadata.httpStatusCode,
    };
};