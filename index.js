const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

//2.09
// Blocking - Synchronous Way
// const textRead = fs.readFileSync("./txt/append.txt", "utf-8");
// console.log(textRead);
// const textOut = `blah blah blah ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("Written Successful");

//2.10
// Non-Blocking - Asynchronous Way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log(`your file has been written !`);
//       });
//     });
//   });
// });

// console.log("Will read file!");
// console.log("Read THIS 2nd");

//2.11
// SERVER
// const server = http.createServer((req, res) => {
//   // console.log(req.url);
//   // console.log(req.url);
//   const pathName = req.url;
//   if (pathName == "/overview") {
//     res.end("this is overview page");
//   } else if (pathName == "/products") {
//     res.end("this is products page");
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//     });
//     res.end("<h1>Page NOT found!!!</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log(`Listening to requests on localhost:${"8000"}`);
// });

//2.13 Building a simple API

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataOBJ = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(url.parse());
  const pathName = req.url;
  if (pathName == "/overview") {
    res.end("this is overview page");
  } else if (pathName == "/products") {
    res.end("this is products page");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page NOT found!!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening to requests on localhost:${"8000"}`);
});
