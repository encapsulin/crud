// import { DynamoDB } from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
// const dynamo = DynamoDBDocument.from(new DynamoDB());

const tableName = 'tbCrud';

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
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
const dynamo = DynamoDBDocumentClient.from(client);

////////////////////////////////////////////////

/////////////////////////////////////////////////
export const fnDynamoQuery = async (args_) => {
    //defaults
    let params = {
        TableName: tableName,
        ScanIndexForward: false,
        KeyConditionExpression: "#partKey = :partVal AND #sortKey >= :sortVal",
        ExpressionAttributeNames: {
            '#partKey': 'pkid', // Partition key
            '#sortKey': 'skid', // LSI sort key
        },
        ExpressionAttributeValues: {
            ":partVal": "0",
            ":sortVal": "0"
        },
        //Limit: 10
        //ProjectionExpression: 'orderId, orderDate, totalAmount',  // Specify the attributes you want
    };

    //customize defaults
    if (args_) {

        if (args_.index !== null) {
            params.KeyConditionExpression = "#partKey = :partVal AND #sortKey = :sortVal";
            params.ExpressionAttributeValues = { ":partVal": "0", ":sortVal": args_.indexVal }

            if (args_.index === "skid") {
                params.ExpressionAttributeNames = { '#partKey': 'pkid', '#sortKey': 'skid' }
            } else if (args_.index === "parent") {
                params.IndexName = 'parent-index';  // Name of your LSI
                params.ExpressionAttributeNames = { '#partKey': 'pkid', '#sortKey': 'parent' }
            } else if (args_.index === "role") {
                params.IndexName = 'role-index';  // Name of your LSI
                params.ExpressionAttributeNames = { '#partKey': 'pkid', '#sortKey': 'role' }
            }
        }

        for (let filter of args_.filters) {
            if (filter.key === "search") {
                params.FilterExpression = 'contains(titleLower, :filterVal)';
                params.ExpressionAttributeValues[":filterVal"] = filter.val;
            } else {
                params.FilterExpression = '#filterKey = :filterVal'
                params.ExpressionAttributeNames["#filterKey"] = filter.key
                params.ExpressionAttributeValues[":filterVal"] = filter.val;
            }

        }

        if (args_.index !== "role")
            params.Limit = 10

    }

    console.log("QueryCommand():", params);

    const command = new QueryCommand(params);
    try {
        const data = await dynamo.send(command);
        console.log(data)
        return {
            statusCode: data.$metadata.httpStatusCode,
            data: data
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: error.$metadata.httpStatusCode,
            data: error.messgae
        };
    }
};

/////////////////////////////////////////////
export const fnDynamoPut = async (item) => {
    console.log("fnDynamoPut():", item);

    const params = {
        TableName: tableName,
        Item: item
    };

    const command = new PutCommand(params);
    try {
        const data = await dynamo.send(command);
        return {
            statusCode: data.$metadata.httpStatusCode,
            data: item.skid
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: data.$metadata.httpStatusCode,
            data: error.message
        };
    }

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
    try {
        const data = await dynamo.send(command);
        return {
            statusCode: data.$metadata.httpStatusCode,
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: error.$metadata.httpStatusCode,
            data: error.message
        };
    }
};

/////////////////////////////////////////////
export const fnDynamoUpdate = async (data_) => {
    console.log("fnDynamoUpdate():", data_);

    const params = {
        TableName: tableName,
        Key: {
            "pkid": "0",
            "skid": data_.skid
        },
        UpdateExpression: "set #attrName = :newValue",  // Update expression to set new values
        ExpressionAttributeNames: {
            "#attrName": data_.key   // Replace with the attribute you want to update
        },
        ExpressionAttributeValues: {
            ":newValue": data_.value  // Replace with the new value for the attribute
        },
        // ReturnValues: "ALL_NEW"  // Optional: returns the updated item after the operation
    };

    const command = new UpdateCommand(params);
    try {
        const data = await dynamo.send(command);
        console.log(data);
        return {
            statusCode: data.$metadata.httpStatusCode,
            // data: data
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: error.$metadata.httpStatusCode,
            data: error.message
        };
    }

};

///////////////////////////
// export const dynamo_send = async (command) => {
//     try {
//         console.log("dynamo_send()");
//         const data = await dynamo.send(command);
//         console.log("data:", data);
//         return data;
//     } catch (error) {
//         console.error("Error:", error);
//         throw error;
//     } finally {
//         //console.log("finally");
//     }
// };

    // const params = {
    //     TableName: 'Orders',  // Your table name
    //     IndexName: 'OrderDateIndex',  // Name of your LSI
    //     KeyConditionExpression: '#userId = :userId AND #orderDate BETWEEN :startDate AND :endDate',
    //     ExpressionAttributeNames: {
    //       '#userId': 'userId',       // Partition key
    //       '#orderDate': 'orderDate', // LSI sort key
    //     },
    //     ExpressionAttributeValues: {
    //       ':userId': 'user123',         // Partition key value
    //       ':startDate': '2023-01-01',   // Start date for the LSI sort key
    //       ':endDate': '2023-12-31',     // End date for the LSI sort key
    //     },
    //     ProjectionExpression: 'orderId, orderDate, totalAmount',  // Specify the attributes you want
    //   };