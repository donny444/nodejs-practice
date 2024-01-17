const querystring = require("node:querystring");

const queryobject = {
    "foo": "bar",
    "abc": ["xyz", "123"]
}

const log = querystring.stringify(queryobject);

console.log(log);