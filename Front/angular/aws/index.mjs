import { dynamo_serv_query, dynamo_serv_put, dynamo_serv_update, dynamo_serv_delete } from './fn_dynamo_serv.mjs'
//import { fn_auth } from './fn_auth.mjs'
//import { fn_auth_token_validate } from './fn_auth_token_validate.mjs'

export const handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('event:', event);
    const httpMethod =  event.requestContext.http.method; // event.httpMethod?
    console.log("httpMethod:",httpMethod);
    console.log("event.body:", event.body);
    console.log("event.queryStringParameters:", event.queryStringParameters);

    let body = "";
    let statusCode = '200';
    let statusMsg = "ok?";
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'POST, GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '3600'  // Cache preflight response for 1 hour
    };

    try {

        switch (httpMethod) {
            case 'OPTIONS':
                statusCode = 204;
                body = "";
                break;
            case 'GET':
                let args = {}

                if (event.queryStringParameters !== null)
                    args = event.queryStringParameters;

                body = await dynamo_serv_query(args);
                break;
            case 'POST':
            case 'PUT':

                //auth
                // let eventBody = JSON.parse(event.body);
                // if (eventBody.uid !== undefined && eventBody.pwd !== undefined) {
                //     let jwt = await fn_auth(eventBody.uid, eventBody.pwd)
                //     if (jwt) {
                //         body = { data: jwt }
                //     } else
                //         statusCode = 401;
                // }
                // else fn_auth_token_validate(event.headers.authorization)

                if (JSON.parse(event.body).skid !== undefined)
                    body = await dynamo_serv_put(JSON.parse(event.body));

                break;
            case 'DELETE':
                //fn_auth_token_validate(event.headers.authorization)
                body = await dynamo_serv_delete(event.queryStringParameters.skid);
                break;
            case 'PATCH':
                //await fn_auth_token_validate(event.headers.authorization)
                body = await dynamo_serv_update(event.queryStringParameters.skid, JSON.parse(event.body));
                break;

            default: {
                throw new Error(`Unsupported method "${event.httpMethod}"`);
            }
        }
    } catch (err) {
        statusCode = '500';
        body = err.message;

    } finally {
        console.log(body);
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};


