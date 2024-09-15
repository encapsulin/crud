import { fnDynamoQuery, fnDynamoPut, fnDynamoDelete } from './fn_dynamo_repo.mjs';

export const dynamo_query = async (params_) => {
    console.log("dynamo_query():", params_);
    let data = await fnDynamoQuery(params_);
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

export const dynamo_delete = async (param_) => {
    //console.log("dynamo_delete():", params_);
    let data = await fnDynamoDelete(param_)
    return data;
};

