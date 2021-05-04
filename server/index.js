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

io.on("connection", function(socket) { // neue Verbindung eines Clients
  console.log(`Socket <${socket.id}> connected...`); 
  allClients.push(socket);
  
  socket.on("clientMessage", function(message) { // neue Nachricht
      console.log(message + " (login)");
  });

  socket.on("disconnect", function() {
    console.log(`Socket <${socket.id}> disconnected...`);
    let i = allClients.indexOf(socket);
    allClients.splice(i, 1);
  });
});



app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});