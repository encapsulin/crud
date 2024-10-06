const tableName = 'tbCrud';

import { DynamoDB } from "@aws-sdk/client-dynamodb";

const dynamo = new DynamoDB();
let lastEvaluatedKey = {
    pkid: { S: '0' },
    skid: { S: '20241006_085820_994' },
    titleLower: { S: '20241006-085820.860' }
}
const params = {
    Statement: `SELECT * FROM "tbCrud"."titleLower-index" 
        WHERE "pkid" = '0' AND CONTAINS("titleLower", '20241006-09500') `,
    //Limit: 5,
    //ExclusiveStartKey: lastEvaluatedKey,
    //ReturnConsumedCapacity: 'TOTAL'
};

console.log("params:", params)

// dynamo.executeStatement(params, (err, data) => {
//     if (err) {
//         console.error("executeStatement error:", err);
//     } else {
//         console.log("executeStatement result:", data);
//     }
// });


function reformat(data_) {
    const out = data_.map(item => {
        const transformedItem = {};

        for (const key in item) {
            if (item[key].S) {
                transformedItem[key] = item[key].S;
            } else if (item[key].N) {
                transformedItem[key] = Number(item[key].N);
            } else if (item[key].BOOL) {
                transformedItem[key] = item[key].BOOL;
            }
            // Add more cases for other DynamoDB types if necessary
        }

        return transformedItem;
    });
    return out;
}

// Manual promise wrapper for executeStatement
// function executeStatementPromise(params) {
//     return new Promise((resolve, reject) => {
//         dynamo.executeStatement(params, (err, data) => {
//             if (err) {
//                 reject(err); // Pass the error to the catch block
//             } else {
//                 resolve(data); // Pass data to the async function
//             }
//         });
//     });
// }

// async function executeStatementAsync(params) {
//     try {
//         const data = await executeStatementPromise(params); // Use custom promise here
//         console.log("executeStatement result:", data);

//         data.Items = reformat(data.Items);
//         console.log("Query reformat:", data.Items);

//         return data;
//     } catch (err) {
//         console.error("executeStatement error:", err);
//     }
// }


// async function executePaginatedStatement(params) {
//     let allItems = [];
//     let lastEvaluatedKey = null;

//     do {
//         if (lastEvaluatedKey) {
//             params.NextToken = Buffer.from(JSON.stringify(lastEvaluatedKey)).toString('base64');
//         }

//         try {
//             const data = await dynamo.executeStatement(params).promise();
//             const items = (data.Items);
//             allItems = allItems.concat(items);

//             lastEvaluatedKey = data.LastEvaluatedKey;

//             console.log('Partial result:', items);
//         } catch (err) {
//             console.error('executeStatement error:', err);
//             return;
//         }
//     } while (lastEvaluatedKey);

//     return allItems;
// }


function executePaginatedStatement(params, callback) {
    let allItems = [];

    function queryDynamo(nextToken) {
        if (nextToken) {
            params.NextToken = nextToken;  // Use the NextToken directly from the previous response
        } else {
            delete params.NextToken;  // Clear NextToken if not needed
        }

        dynamo.executeStatement(params, (err, data) => {
            if (err) {
                console.error("executeStatement error:", err);
                callback(err, null);
                return;
            }

            const items = data.Items || [];
            allItems = allItems.concat(items);

            const nextToken = data.NextToken;  // Store NextToken from response

            if (nextToken) {
                // If there are more results, continue querying
                queryDynamo(nextToken);
            } else {
                // If no more results, return all collected items
                callback(null, allItems);
            }
        });
    }

    queryDynamo();  // Start initial query
}


executePaginatedStatement(params, (err, result) => {
    if (err) {
        console.error("Error retrieving results:", err);
    } else {
        console.log("Final result:", result);
    }
});