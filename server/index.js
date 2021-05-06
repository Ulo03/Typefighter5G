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
var allClients = [];
var allUsernames = [];

io.on("connection", function(socket) { // neue Verbindung eines Clients
  console.log(`Socket <${socket.id}> connected...`);
  allClients.push(socket);
  let si = allClients.indexOf(socket);
  
  socket.on("sendUsername", function(message) {
    allUsernames[si] = message;
    console.log(allUsernames[si] + " logged in!");
  });

  socket.on("disconnect", function() {
    console.log(`Socket <${socket.id}> disconnected...`);
    console.log(allUsernames[si] + " logged out!");
    allClients.splice(si, 1);
    allUsernames.splice(si, 1);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(80, () => {
  console.log('listening on *:80');
});