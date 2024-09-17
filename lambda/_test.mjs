import { handler } from "./index.mjs"

//let event = await fn_file("_test_event.json");
let event = {
    body: "{\"title\":\"value1\", \"descr\":\"value2\"}",
    httpMethod: "GET",
    queryStringParameters: {
        // "skid": "20240915_231828_2020"
        parent: 0
    }
}
//console.log(typeof event);
handler(event);