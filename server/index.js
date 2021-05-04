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

io.on("connection", function(socket) { // neue Verbindung eines Clients
  console.log("user connected..."); 
  
  socket.on("clientMessage", function(message) { // neue Nachricht
      console.log(message + " (login)");
      socket.broadcast.emit("serverMessage", "phillip schreibt man mit 2 l");
  });

  socket.on("disconnect", function() {
    console.log("disconnect");
  });

  
});



app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});