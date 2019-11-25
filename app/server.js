require("colors");
const loadEvents = require("./socketEvents/events");

const app = require("./app");

var http = require("http").Server(app);
var io = require("socket.io")(http);

const PORT = process.env.PORT || 5000;

io.on("connection", function(socket) {
  console.log("a user connected");
  loadEvents(socket);
});

const server = http.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
/* eslint-disable-next-line no-unused-vars */
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  // Close server & exist process
  server.close(() => {
    process.exit(1);
  });
});
