console.log("UP AND RUNNING 🔥");

let express = require("express");

let app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port);

console.log("SERVER IS RUNNING on http://localhost:" + port);

app.use(express.static("public"));

let serverSocket = require("socket.io");

let io = serverSocket(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("CLIENT CONNECTED:  " + socket.id);

  socket.on("userMessage", (data) => {
    io.sockets.emit("userMessage", data);
  });
  socket.on("userTyping", (data) => {
    socket.broadcast.emit("userTyping", data);
  });
});
