const fs = require("fs");
const hello = "Hello World";
console.log(hello);

const textRead = fs.readFileSync("./txt/append.txt", "utf-8");
console.log(textRead);

const textOut = `blah blah blah ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("Written Successful");
