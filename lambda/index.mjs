import { dynamo_query, dynamo_put, dynamo_update, dynamo_delete } from './fn_dynamo_serv.mjs'

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
export const handler = async (event) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('event:', event);
    console.log("event.httpMethod:", event.httpMethod);
    console.log("event.body:", event.body);
    console.log("event.queryStringParameters:", event.queryStringParameters);

    let body = "2";
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
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
                body = await dynamo_update(JSON.parse(event.body));
                break;
            default: {
                throw new Error(`Unsupported method "${event.httpMethod}"`);
            }
        }
    } catch (err) {
        statusCode = '400';
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


