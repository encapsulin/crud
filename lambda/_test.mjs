import { handler } from "./index.mjs"
import { fn_file } from './fn_file.mjs';

let event = await fn_file("event.json");
console.log(typeof event);
handler(JSON.parse(event));