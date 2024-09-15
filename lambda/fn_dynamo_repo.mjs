// import { DynamoDB } from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
// const dynamo = DynamoDBDocument.from(new DynamoDB());

import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
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
        const response = await dynamo.send(command);
        console.log("Query OK:", response);
        return response.Items;
    } catch (error) {
        console.error("Query Error:", error);
        throw error;
    } finally {
        //console.log("asdf 41");
    }
};

/////////////////////////////////////////////////
export const fnDynamoSendQuery = async (params) => {
    params.TableName = tableName;
    params.ScanIndexForward = false;
    console.log("fnDynamoSendQuery():", params);
    const command = new QueryCommand(params);
    const data = await dynamo_send(command);
    console.log("asdf3 data:", data);
    return data;

};

/////////////////////////////////////////////
export const fnDynamoPut = async (item) => {
    console.log("fnDynamoPut():", item);

    item.skid = fnDateToIso(fnDatePlusDHM(new Date(), 0, 2));
    item.pkid = "0";


    // Define the parameters for the put operation
    const params = {
        TableName: tableName,
        Item: item
    };

    try {
        await dynamo.send(
            new PutCommand(params)
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ skid: item.skid })
        };
    } catch (error) {
        console.error('Error inserting item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to insert item.', error: error.message })
        };
    }
};
