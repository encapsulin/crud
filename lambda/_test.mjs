import { handler } from "./index.mjs"
import { fn_file } from './fn_file.mjs';

//let event = await fn_file("_test_event.json");
let event = {
    body: "{\"title\":\"value1\", \"descr\":\"value2\"}",
    httpMethod: "PATCH",
    queryStringParameters: {
        "skid": "20240915_231828_202"
    }
}
//console.log(typeof event);
handler(event);