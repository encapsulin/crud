import { dynamo_serv_query, dynamo_serv_put, dynamo_serv_update, dynamo_serv_delete } from './fn_dynamo_serv.mjs'
import { fn_auth, fn_auth_token_validate } from './fn_auth.mjs'


export const handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('event:', event);
    console.log("event.httpMethod:", event.httpMethod);
    console.log("event.body:", event.body);
    console.log("event.queryStringParameters:", event.queryStringParameters);

    let body = "";
    let statusCode = '200';
    let statusMsg = "Method Not Allowed";
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '3600'  // Cache preflight response for 1 hour
    };

    try {

        switch (event.httpMethod) {
            case 'GET':
                let args = {}

                if (event.queryStringParameters !== null)
                    args = event.queryStringParameters;

                body = await dynamo_serv_query(args);
                break;
            case 'POST':
            case 'PUT':

                //auth
                let eventBody = JSON.parse(event.body);
                if (eventBody.uid !== undefined && eventBody.pwd !== undefined) {
                    let jwt = fn_auth(eventBody.uid, eventBody.pwd)
                    if (jwt) {
                        body = { data: jwt }
                    } else
                        statusCode = 401;
                }
                else fn_auth_token_validate(event.headers.authorization)

                if (JSON.parse(event.body).skid !== undefined)
                    body = await dynamo_serv_put(JSON.parse(event.body));

                break;
            case 'DELETE':
                fn_auth_token_validate(event.headers.authorization)
                body = await dynamo_serv_delete(event.queryStringParameters.skid);
                break;
            case 'PATCH':
                fn_auth_token_validate(event.headers.authorization)
                body = await dynamo_serv_update(event.queryStringParameters.skid, JSON.parse(event.body));
                break;
            case 'OPTIONS':
                body = "";
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


