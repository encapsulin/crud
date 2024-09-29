import { fnDynamoQuery, fnDynamoPut, fnDynamoDelete, fnDynamoUpdate } from './fn_dynamo_repo.mjs';
import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

//let data = await getParentsRecurs("0")
//console.log(data)

export const dynamo_serv_query = async (args) => {
    console.log("dynamo_serv_query():", args);

    let data = [];
    let params = { index: null, filters: [] }

    // define index
    if (params.index === null && args.skid !== undefined) {
        params.index = "skid"
        params.indexVal = args.skid;
    }
    if (params.index === null && args.parent !== undefined) {
        params.index = "parent"
        params.indexVal = args.parent;
    }
    if (params.index === null && args.role !== undefined) {
        params.index = "role"
        params.indexVal = args.role;
    }

    //define filters
    if (params.index !== "parent" && args.parent !== undefined) {
        params.filters.push({ key: "parent", val: args.parent });
    }
    if (params.index !== "role" && args.role !== undefined) {
        params.filters.push({ key: "role", val: args.role });
    }
    if (args.search !== undefined) {
        params.filters.push({ key: "search", val: args.search });
    }

    data = await fnDynamoQuery(params);
    return data;
};

export const dynamo_serv_put = async (data_) => {
    console.log("dynamo_put():", data_);
    if (data_.skid === undefined || data_.skid === "0")
        data_.skid = fnDateToIso(fnDatePlusDHM(new Date(), 0, 2));
    data_.pkid = "0";
    data_.descr += " ";//empty key value is not allowed
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

