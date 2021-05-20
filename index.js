const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let users = {}
let games = {};

io.on("connection", function(socket) { // neue Verbindung eines Clients
    console.log(`Socket <${socket.id}> connected...`);
    io.emit("gameUpdate", games);
    let si = -1;

    socket.on("sendUsername", function(message) {
        let newUser = {
            socketID: socket.id,
            name: message,
            currentRoom: null
        };
        users[socket.id] = newUser;
        console.log(users[socket.id].name + " logged in!");
        io.emit("onlineCount", Object.keys(users).length - 1);
    });

    socket.on("joinGame", function(roomName) {
        if (games[roomName].players.length < games[roomName].maxPlayers) {
            users[socket.id].currentRoom = roomName;
            games[roomName].players.push(users[socket.id]);
            socket.join(roomName);
            console.log(users[socket.id].name + " joined Room -> " + games[roomName].name);
            
            socket.emit("response", "200");
            io.emit("gameUpdate", games);
        } else {
            socket.emit("response", "Das Spiel ist voll!");
        }
    });

    socket.on("createGame", function(roomName) {
        let newGame = {
            name: roomName,
            started: false,
            players: [],
            maxPlayers: 4,
            hostSocketID: socket.id
        };
        console.log(newGame.hostSocketID);
        users[socket.id].currentRoom = roomName;
        newGame.players.push(users[socket.id]);
        games[roomName] = newGame;
        socket.join(roomName);

        io.emit("gameUpdate", games);
        console.log("room created: " + roomName);
    });

    socket.on("leaveGame", function(roomName) {
        socket.leave(roomName);
        leaveRoom(socket.id, roomName);
    });

    socket.on("disconnect", function() {
        console.log(`Socket <${socket.id}> disconnected...`);
        console.log(users[socket.id].name + " logged out!");
        if (users[socket.id].currentRoom) {
            let roomName = users[socket.id].currentRoom;
            leaveRoom(socket.id, roomName)
        }
        delete users[socket.id];
        io.emit("onlineCount", Object.keys(users).length - 1);
    });

    function leaveRoom(socketID, roomName) {
        let playerList = games[users[socketID].currentRoom].players;
        let idx = playerList.find((obj) => {
            return obj.socketID == socketID;
        });
        playerList.splice(idx, 1);
        users[socketID].currentRoom = null;
        if (playerList.length <= 0) {
            delete games[roomName];
        } else if (games[roomName].hostSocketID == socketID) {
            games[roomName].hostSocketID = playerList[0].socketID;
            socket.to(playerList[0].socketID).emit("setJoinHost", "host");
        }
        io.emit("gameUpdate", games);
    }
});

server.listen(80, () => {
    console.log('listening on *:80');
});