function loadEvents(socket) {
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("out", function(buffer) {
    socket.broadcast.emit("in", buffer);
  });
}

module.exports = loadEvents;
