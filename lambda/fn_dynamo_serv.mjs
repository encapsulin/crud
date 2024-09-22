import { fnDynamoQuery, fnDynamoPut, fnDynamoDelete, fnDynamoUpdate } from './fn_dynamo_repo.mjs';
import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

//let data = await getParentsRecurs("0")
//console.log(data)

export const dynamo_serv_query = async (args) => {
    console.log("dynamo_serv_query():", args);
    let data = [];

    if (args.skid !== undefined) {
        args.index = "skid"
        args.indexVal = args.skid;
    }

    if (args.role !== undefined) {
        args.index = "role"
        args.indexVal = args.role;
    }

    if (args.search !== undefined) {
        args.filter = "title"
        args.filterVal = args.search;
    }

    if (args.parent !== undefined) {
        args.index = "parent"
        args.indexVal = args.parent;
        data = await dynamo_serv_query_recur_for_parent(args);
    }
    else
        data = await fnDynamoQuery(args);

    return data;
};

export const dynamo_serv_query_recur_for_parent = async (args) => {
    console.log("dynamo_serv_query_recur():", args);

    // let params = {};
    // if (args_ === null && args.index === undefined) {
    //     params.index = "parent";
    //     params.indexVal = "0";
    // } else params = args_;

    let res = await fnDynamoQuery(args);
    let data = res.data;

    for (let i = 0; i < data.length; i++) {
        args.indexVal = data[i].skid;
        data[i].kids = await dynamo_serv_query_recur_for_parent(args)
    }

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

