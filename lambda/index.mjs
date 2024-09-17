import { dynamo_query, dynamo_put, dynamo_update, dynamo_delete } from './fn_dynamo_serv.mjs'

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. 
 */
export const handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('event:', event);
    console.log("event.httpMethod:", event.httpMethod);
    console.log("event.body:", event.body);
    console.log("event.queryStringParameters:", event.queryStringParameters);

    let body = "";
    let statusCode = '200';
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
                body = await dynamo_query(event.queryStringParameters);
                break;
            case 'POST':
            case 'PUT':
                body = await dynamo_put(JSON.parse(event.body));
                break;
            case 'DELETE':
                body = await dynamo_delete(event.queryStringParameters.skid);
                break;
            case 'PATCH':
                body = await dynamo_update(event.queryStringParameters.skid, JSON.parse(event.body));
                break;
            case 'OPTIONS':
                body = "";
                break;
            default: {
                throw new Error(`Unsupported method "${event.httpMethod}"`);
            }
        }
    } catch (err) {
        statusCode = '404';
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


