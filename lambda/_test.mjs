import { handler } from "./index.mjs"

//let event = await fn_file("_test_event.json");
let event = {
    body: "{\"title\":\"value11\", \"descr\":\"\", \"skid\":\"20240918_204036_548\"}",
    httpMethod: "GET",
    queryStringParameters: {
        //filter:, filterVal:
        // skid: "20240917_133512_234",
        parent: "0", role: "dir",
        // filter: "role", filterVal: "dir"
        //search: "asdf"
    }
}
//console.log(typeof event);
handler(event);