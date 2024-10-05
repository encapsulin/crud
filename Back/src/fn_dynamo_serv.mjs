import { fnDynamoQuery, fnDynamoPut, fnDynamoDelete, fnDynamoUpdate } from './fn_dynamo_repo.mjs';
import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

//let data = await getParentsRecurs("0")
//console.log(data)

export const dynamo_serv_query = async (args) => {
    console.log("dynamo_serv_query():", args);

    let params = {
        KeyConditionExpression: 'pkid = :pkidV AND #sortK = :sortV',
        ExpressionAttributeNames: { '#sortK': 'skid' },
        ExpressionAttributeValues: { ':pkidV': '0', ':sortV': '0' },
        TableName: 'tbCrud',
        ScanIndexForward: false,
        Limit: 10
        //ProjectionExpression: 'orderId, orderDate, totalAmount',  // Specify the attributes you want
    };

    if (args.skid !== undefined) {
        params.ExpressionAttributeValues[':sortV'] = args.skid;
    }

    if (args.parent !== undefined) {
        params.IndexName = 'parent-index';
        params.KeyConditionExpression = 'pkid = :pkidV AND #sortK = :sortV';
        params.ExpressionAttributeNames['#sortK'] = 'parent';
        params.ExpressionAttributeValues[':sortV'] = args.parent;
    }

    //?
    if (args.role !== undefined) {
        if (args.role === 'dir')
            delete params.Limit;
        if (params.IndexName === undefined) {
            params.IndexName = 'role-index';
            params.KeyConditionExpression = 'pkid = :pkidV AND #sortK = :sortV';
            params.ExpressionAttributeNames['#sortK'] = 'role';
            params.ExpressionAttributeValues[':sortV'] = args.role;
        } else {
            params.FilterExpression = '#roleK = :roleV';
            params.ExpressionAttributeNames['#roleK'] = 'role';
            params.ExpressionAttributeValues[':roleV'] = args.role;
        }

    }

    //TODO
    if (args.search !== undefined) {
        params.IndexName = 'titleLower-index';
        // params.FilterExpression = 'contains(titleLower, :titleLowerV)';
        params.KeyConditionExpression = 'pkid = :pkidV AND begins_with(#titleLowerK, :titleLowerV)';
        params.ExpressionAttributeNames = { '#titleLowerK': 'titleLower' };
        params.ExpressionAttributeValues = { ':pkidV': '0', ':titleLowerV': args.search };
    }

    //?
    if (args.pageNext !== undefined && args.pageNext !== '0') {
        params.ExclusiveStartKey = {
            pkid: '0',                          // Partition key value from the previous query result
            skid: args.pageNext,      // Sort key value from the previous query result
        };
        if (args.parent !== undefined)
            params.ExclusiveStartKey['parent'] = args.parent;
    }

    let data = await fnDynamoQuery(params);
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
    data_.titleLower = data_.title.toLowerCase();

    let data = await fnDynamoPut(data_)
    return data;
};

export const dynamo_serv_update = async (skid, params) => {
    console.log("dynamo_update():", skid, params);
    params.titleLower = params.title.toLowerCase()
    let out = [];
    for (const key in params) {
        let item = {
            skid: skid,
            key: key,
            value: params[key],
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

