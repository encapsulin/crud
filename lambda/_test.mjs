import { handler } from "./index.mjs"

//let event = await fn_file("_test_event.json");
let event = {
    body: "{\"title\":\"value11\", \"descr\":\"\", \"skid\":\"20240918_204036_548\"}",
    httpMethod: "GET",
    queryStringParameters: {
        //role: "dir",
        search: "asdf"

        // skid: "20240917_133512_234",
        //parent: "0", role: "dir",
        // parent: "0", role: "doc",
        // filter: "role", filterVal: "dir"

    }
}

let event_auth = {
    body: "{\"uid\":\"demo1\", \"pwd\":\"fa23-8d20-41b0-aw4\"}",
    httpMethod: "POST"
}
//console.log(typeof event);
handler(event_auth);