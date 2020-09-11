const EventEmitter = require("events");
const http = require("http");

// class Sales extends EventEmitter {
//   constructor() {
//     super();
//   }
// }

// const myEmitter = new Sales();

// myEmitter.on("newSale", () => console.log("There was a sale"));

// myEmitter.on("newSale", () => console.log("Customer Name: Jack"));

// myEmitter.on("newSale", (stock) =>
//   console.log(`There are now ${stock} items left`)
// );

// myEmitter.emit("newSale", 9);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Reqest received");
});

server.on("request", (req, res) => {
  console.log("Another request");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () =>
  console.log("Server listening on Port 8000")
);
