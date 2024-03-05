const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const slugify = require("slugify");
console.log(slugify("Fresh MANGO", { lower: true, remove: /[*+~.()'"!:@]/g }));

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

console.log(fs.readFileSync("./txt/append.txt", "utf-8"));
fs.writeFileSync("./txt/append.txt", "");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProuduct = fs.readFileSync(
  `./templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataOBJ = JSON.parse(data);
const slugs = dataOBJ.map((ele) => slugify(ele.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(url.parse(req.url, true));
  let { query, pathname } = url.parse(req.url, true);
  // console.log(query.id);
  // console.log(url.parse());
  // const pathName = req.url;
  //Overview page
  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataOBJ
      .map((ele) => replaceTemplate(tempCard, ele))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  // Prouducts page
  else if (pathname == "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataOBJ[query.id];
    const output = replaceTemplate(tempProuduct, product);
    console.log(query.id);
    res.end(output);
  }
  // api data page
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  // Not found page
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page NOT found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening to requests on localhost:${"8000"}`);
});

// NPM is package manager
// There are two types of packages are in NPM that we can use
//   I) Depenedency
//  II) Dev Dependency - The depedency that are needed on production

// console.log("hwl");
// npm ~ means wanted version
// npm * means all the version's
// npm uninstall package_name to unistall pkg
// Web Application = Dyanmic Website + Funcationality

// SERVER-SIDE RENDERING
//Dynamic Website => Database -> Get Data -> Build Website -> HTML,CSS,JS <=> Browser -> UI / Web Page
//                                         Template -↑
// CLIENT-SIDE RENDERING
//<----BUILDING API-------------------------------><----CONSUMING API---------------------->
// API Site => Database -> Get Data  ----> JSON <=> Browser -> Build Website -> UI/Webpage

//4 - How Nodejs Works A Look Behind the Scenes

// Node.js is javascript runtime based on the google's V8 engine. V8 is fundamental part of NODE architecture. V8 converts javascript code into machine code
// V8 is not enough to create a server side render web app so there is LIBUV. LIBUV is an open source library strogly focuses on asynchronous IO Input Output.LIBUV is written in C++ and also uses js. LIBUV contains the important features as Event Loop and Thread Pool
// Event loop is responsible for handling easy tasks like executing the callbacks and network IO
// Thread poop is responsible for more heavy work like file access or compression
// Node is also relie on http-parser , c-ares, OpenSSL zlib
// c-ares for some DNS request stuff
// -
