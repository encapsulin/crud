import { fnDynamoQuery, fnDynamoPut, fnDynamoDelete, fnDynamoUpdate } from './fn_dynamo_repo.mjs';
import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

export const dynamo_query = async (params_) => {
    console.log("dynamo_query():", params_);
    let data = await fnDynamoQuery(params_);
    return data;
};

export const dynamo_put = async (data_) => {
    console.log("dynamo_put():", data_);
    data_.skid = fnDateToIso(fnDatePlusDHM(new Date(), 0, 2));
    data_.pkid = "0";
    if (data_.parent === undefined)
        data_.parent = "0";

    let data = await fnDynamoPut(data_)
    return data;
};

export const dynamo_update = async (skid, params) => {
    console.log("dynamo_update():", skid, params);
    let out = [];
    for (const key in params) {
        let item = {
            skid: skid,
            key: key,
            value: params[key]
        }
        item.updateResult = await fnDynamoUpdate(item)
        out = [...out, item]
    }
    console.log(out)
    return {
        statusCode: out[0].updateResult.statusCode,
        data: JSON.stringify(out)
    };
};

export const dynamo_delete = async (param_) => {
    //console.log("dynamo_delete():", params_);
    let data = await fnDynamoDelete(param_)
    return data;
};

