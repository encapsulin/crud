import { fnDynamoQuery, fnDynamoPut, fnDynamoDelete, fnDynamoUpdate } from './fn_dynamo_repo.mjs';
import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

//let data = await getParentsRecurs("0")
//console.log(data)

async function getParentsRecurs(parentId) {
    let params = { parent: parentId };
    let res = await fnDynamoQuery(params);
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        item.kids = await getParentsRecurs(item.skid)
    }
    return data;
}

export const dynamo_serv_query_recur = async (dataIn) => {
    console.log("dynamo_serv_query_recur():", dataIn);

    if (dataIn.parent === undefined)
        dataIn.parent = "0"

    let dataOut = await getParentsRecurs(dataIn.parent)
    return dataOut;
};

export const dynamo_serv_query_plain = async (dataIn) => {
    console.log("dynamo_serv_query_plain():", dataIn);
    let dataOut = await fnDynamoQuery(dataIn);
    return dataOut;
};

export const dynamo_serv_put = async (data_) => {
    console.log("dynamo_put():", data_);
    data_.skid = fnDateToIso(fnDatePlusDHM(new Date(), 0, 2));
    data_.pkid = "0";
    if (data_.parent === undefined)
        data_.parent = "0";

    let data = await fnDynamoPut(data_)
    return data;
};

export const dynamo_serv_update = async (skid, params) => {
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

export const dynamo_serv_delete = async (param_) => {
    //console.log("dynamo_delete():", params_);
    let data = await fnDynamoDelete(param_)
    return data;
};

