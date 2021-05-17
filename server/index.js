const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static("public"));
let allClients = [];
let allUsernames = [];
let openGames = [];

io.on("connection", function(socket) { // neue Verbindung eines Clients
  console.log(`Socket <${socket.id}> connected...`);
  allClients.push(socket);
  io.emit("gameUpdate", openGames);
  io.emit("onlineCount", allClients.length);
  let si = -1;
  
  socket.on("sendUsername", function(message) {
    si = allClients.indexOf(socket);
    allUsernames[si] = message;
    console.log(allUsernames[si] + " logged in!");
  });

  socket.on("createGame", function(roomName) {
    console.log(roomName);
    socket.join(roomName);
    openGames.push(roomName);
    io.emit("gameUpdate", openGames);
    console.log("room created");
  });

  socket.on("disconnect", function() {
    si = allClients.indexOf(socket);
    console.log(`Socket <${socket.id}> disconnected...`);
    console.log(allUsernames[si] + " logged out!");
    allClients.splice(si, 1);
    allUsernames.splice(si, 1);
    io.emit("onlineCount", allClients.length);
  });
});

server.listen(80, () => {
  console.log('listening on *:80');
});