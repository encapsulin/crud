import { handler } from "./index.mjs"

//let event = await fn_file("_test_event.json");
let event_post = {
    body: "{\"title\":\"value11\", \"descr\":\"\", \"skid\":\"20240918_204036_548\"}",
    httpMethod: "POST"
}

let event_auth = {
    body: "{\"uid\":\"demo\", \"pwd\":\"fa23-8d20-41b0-aw41\"}",
    httpMethod: "POST"
}

let event_get = {
    // body: "{\"title\":\"value11\", \"descr\":\"\", \"skid\":\"20240918_204036_548\"}",
    httpMethod: "GET",
    queryStringParameters: {
        // skid: "20241004_204806_966",

        // role: "dir",
        // ok

        //   parent: "0", 
        //   role: "dir",
        //   ok

        // parent: "0", 
        // role: "doc",

        //parent: "20240929_160937_354",
        //role: "doc",
        //pageNext: "0",
        //pageNext: "20241004_185811_288",

        //search: "asdf"

        parent: "20241004_204843_611",
        pageNext: "20241004_212358_157",
        role: "doc"

    }
}

let event_search = {
    body: "{\"uid\":\"demo\", \"pwd\":\"fa23-8d20-41b0-aw41\"}",
    httpMethod: "POST"
}
//console.log(typeof event);
handler(event_get);
