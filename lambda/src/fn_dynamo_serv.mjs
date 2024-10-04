import { fnDynamoQuery, fnDynamoPut, fnDynamoDelete, fnDynamoUpdate } from './fn_dynamo_repo.mjs';
import { fnDatePlusDHM, fnTtlMins, fnDateToIso } from './fn_datez.mjs'

//let data = await getParentsRecurs("0")
//console.log(data)

export const dynamo_serv_query = async (args) => {
    console.log("dynamo_serv_query():", args);

    let params = {
        KeyConditionExpression: 'pkid = :pkidV AND skid >= :sortV',
        ExpressionAttributeValues: { ':pkidV': '0', ':sortV': '0' },
        TableName: 'tbCrud',
        ScanIndexForward: false,
        Limit: 2
        //ProjectionExpression: 'orderId, orderDate, totalAmount',  // Specify the attributes you want
    };

    if (args.skid !== undefined) {
        params.KeyConditionExpression = 'pkid = :pkidV AND #sortK = :sortV';
        params.ExpressionAttributeNames = { '#sortK': 'skid' }
        params.ExpressionAttributeValues = { ':pkidV': '0', ':sortV': args.skid }
    }

    if (args.parent !== undefined) {
        params.IndexName = 'parent-index';
        params.KeyConditionExpression = 'pkid = :pkidV AND #sortK = :sortV';
        params.ExpressionAttributeNames = { '#sortK': 'parent' };
        params.ExpressionAttributeValues = { ':pkidV': '0', ":sortV": args.parent };
        params.Limit = 2;
        if (args.parent === '0') {
            //delete params.IndexName;
            // params.FilterExpression = '#filterK = :filterV';
            // params.KeyConditionExpression = 'pkid = :pkidV AND #sortK >= :sortV';
            // params.ExpressionAttributeNames = { '#sortK': 'skid' , '#filterK':'parent'};
            // params.ExpressionAttributeValues = { ':pkidV': '0', ":sortV": '0' ,':filterV':args.parent};
        }
        if (args.pageNext !== undefined && args.pageNext !== '0') {
            delete params.IndexName;
            params.KeyConditionExpression = 'pkid = :pkidV AND #sortK < :sortV';
            params.FilterExpression = '#filterK = :filterV';
            params.ExpressionAttributeNames = { '#sortK': 'skid', '#filterK': 'parent' };
            params.ExpressionAttributeValues = { ':pkidV': '0', ':sortV': args.pageNext, ':filterV': args.parent };
        }
    }

    if (args.role !== undefined) {
        params.IndexName = 'role-index';
        params.KeyConditionExpression = 'pkid = :pkidV AND #sortK = :sortV';
        params.ExpressionAttributeNames = { '#sortK': 'role' }
        params.ExpressionAttributeValues = { ':pkidV': '0', ':sortV': args.role }
        delete params.Limit;
    }

    // const params = {
    //     TableName: 'crud',                // DynamoDB table name
    //     IndexName: 'title-index',         // Local Secondary Index (LSI) to use for filtering by title
    //     KeyConditionExpression: '#pkid = :pkidVal',  // Query by partition key (since we're using an LSI)
    //     FilterExpression: 'contains(#title, :titleSubstring)',  // Filter for titles containing a substring
    //     ExpressionAttributeNames: {
    //       '#pkid': 'pkid',               // Partition key attribute
    //       '#title': 'title'              // 'title' attribute in LSI
    //     },
    //     ExpressionAttributeValues: {
    //       ':pkidVal': '0',               // Value of the partition key (adjust as necessary)
    //       ':titleSubstring': 'example'   // Substring to search for within the title
    //     },
    //     Limit: 10                        // Limit the number of results returned
    //   };
    //TODO
    if (args.search !== undefined) {
        params.IndexName = 'title-index';
        params.FilterExpression = 'contains(titleLower, :filterV)';
        params.ExpressionAttributeValues[':filterV'] = args.search;
        // if (args.parent !== undefined) {
        //     params.KeyConditionExpression = '#pkid = :pkidVal AND #sortKey = :roleV';
        //     params.ExpressionAttributeNames = { '#sortKey': 'parent' };
        //     params.ExpressionAttributeValues[':filterV'] = args.search;
        // }
    }

    // params = {
    //     TableName: tableName,              // DynamoDB table name
    //     // IndexName: 'parent-index',      // Local Secondary Index to use for filtering by parent
    //     KeyConditionExpression: '#pkid = :pkidVal AND #skid < :skidVal',  // pkid = partition key, parent filter
    //     FilterExpression: '#parent = :parentVal',  // Filter skid > 321
    //     ExpressionAttributeNames: {
    //         '#pkid': 'pkid',             // Partition key
    //         '#parent': 'parent',         // 'parent' attribute in LSI
    //         '#skid': 'skid'              // 'skid' attribute for sorting and filtering
    //     },
    //     ExpressionAttributeValues: {
    //         ':pkidVal': '0',             // Value of the partition key (adjust as necessary)
    //         ':parentVal': '20240929_160937_354',         // Parent attribute value to filter by
    //         ':skidVal': '20241003_205037_857'              // Skid value filter
    //     },
    //     ScanIndexForward: false,        // Sort results by skid in descending order
    //     Limit: 3                        // Limit the result to 3 items
    // };



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

