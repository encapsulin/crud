import { fnDynamoSendQuery, fnDynamoPut } from './fn_dynamo_repo.mjs';

export const dynamo_scan = async (params_) => {
    console.log("dynamo_scan():", params_);
    let params = {
        KeyConditionExpression: "pkid = :pkidv AND skid >= :skidv",
        ExpressionAttributeValues: {
            ":pkidv": "0",  // Partition key value
            ":skidv": "0"
        }
    };

    let data = await fnDynamoSendQuery(params);
    return data;
};

export const dynamo_put = async (params_) => {
    console.log("dynamo_put():", params_);
    let data = await fnDynamoPut(params_)
    return data;
};

export const dynamo_update = async (params_) => {
    console.log("dynamo_update():", params_);
    return { "serv": "dynamo_update" };
};

export const dynamo_delete = async (params_) => {
    console.log("dynamo_delete():", params_);
    return { "serv": "dynamo_delete" };
};

