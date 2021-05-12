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
  socket.emit("gameUpdate", openGames);
  socket.emit("onlineCount", allClients.length);
  let si = -1;
  
  socket.on("sendUsername", function(message) {
    si = allClients.indexOf(socket);
    allUsernames[si] = message;
    console.log(allUsernames[si] + " logged in!");
  });

  socket.on("disconnect", function() {
    si = allClients.indexOf(socket);
    console.log(`Socket <${socket.id}> disconnected...`);
    console.log(allUsernames[si] + " logged out!");
    allClients.splice(si, 1);
    allUsernames.splice(si, 1);
    socket.emit("onlineCount", allClients.length);
  });
});

server.listen(80, () => {
  console.log('listening on *:80');
});