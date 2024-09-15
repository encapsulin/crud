import { handler } from "./index.mjs"
import { fn_file } from './fn_file.mjs';

//let event = await fn_file("_test_event.json");
let event = {
    body: "{\"title\":\"value1\", \"descr\":\"value2\"}",
    httpMethod: "GET",
    isBase64Encoded: false,
    queryStringParameters: {
        "skid": "20240915_201448_983-"
    }
}
//console.log(typeof event);
handler(event);