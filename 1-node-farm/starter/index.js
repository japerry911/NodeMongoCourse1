const fs = require("fs");
const http = require("http");

// ------------Files------------
// Blocking Synchronous Way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `Go into ${textIn}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// // Non-Blocking Asynchronous Way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("File has been written");
//       });
//     });
//   });
// });
// console.log("Will read file");

//------------Server------------
const server = http.createServer((req, res) => {
  res.end("Hello from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on Port 8000");
});
