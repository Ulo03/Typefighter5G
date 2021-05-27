const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

const randomWords = require('./words');

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

let colors = ["clr1", "clr2", "clr3", "clr4"];

let gridwidth = 5;
let gridheight = 5;

io.on("connection", function(socket) { // neue Verbindung eines Clients
    console.log(`Socket <${socket.id}> connected...`);
    io.emit("gameUpdate", games);

    socket.on("sendUsername", function(message) {
        let newUser = {
            socketID: socket.id,
            name: message,
            currentRoom: null, 
            color: ""
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
        if (roomName) {
            if (!(Object.keys(games).includes(roomName))) {
                let newGame = {
                    name: roomName,
                    started: false,
                    players: [],
                    maxPlayers: 4,
                    hostSocketID: socket.id,
                    grid: [
                        [{}, {}, {}, {}, {}],
                        [{}, {}, {}, {}, {}],
                        [{}, {}, {}, {}, {}],
                        [{}, {}, {}, {}, {}],
                        [{}, {}, {}, {}, {}]
                      ]
                };
                console.log(newGame.hostSocketID);
                users[socket.id].currentRoom = roomName;
                newGame.players.push(users[socket.id]);
                games[roomName] = newGame;
                socket.join(roomName);
                
                socket.emit("response", "200");
                io.emit("gameUpdate", games);
                console.log("room created: " + roomName);
            } else {
                socket.emit("response", "Es existiert bereits ein Spiel mit dem selben Namen");
            }
        } else {
            socket.emit("response", "Der Spielname darf nicht leer sein");
        }
    });

    socket.on("startGame", function(roomName) {
        startingRoom = games[roomName];

        //get cells
        let cell = {};
        for (let i = 0; i < gridheight; i++) {
            for (let j = 0; j < gridwidth; j++) {
                cell = {
                    word: getRandomWord(),
                    currentPlayer: null
                }
                startingRoom.grid[i][j] = cell;
                
            }
        }
        
        //set colors
        let i = 0;
        for (let p of startingRoom.players) {
            p.color = colors[i];
            i++;
            let currentSocket = io.sockets.sockets.get(p.socketID);
            currentSocket.on(roomName + ":words", async function(word) {
                await validateWord(startingRoom, word, p.socketID);
                console.log("asdf=" + games[roomName].grid[4][4].word);
                
                io.to(roomName).emit("objects", games);
                
                console.log("emited game =" + roomName + ":object" );
            });
        }
        startingRoom.started = true;
        io.emit("gameUpdate", games);
    });

    async function validateWord(room, inputWord, playerSocketID) {
        for (let i = 0; i < room.grid.length; i++) {
            for (let j = 0; j < room.grid[0].length; j++) {
                if (room.grid[i][j].word == inputWord) {
                    console.log("word: " + room.grid[i][j].word);
                    room.grid[i][j].player = users[playerSocketID];
                    room.grid[i][j].player.name;
                    room.grid[i][j].word = getRandomWord();
                    console.log("newWord: " + room.grid[i][j].word);
                }
            }
        }
    }

    //gets random word that is not in startingRoom.grid
    function getRandomWord() {
        let wordInGrid;
        let word; 

        do {
            word = randomWords({exactly: 1,maxLength: 12, minLength: 5})[0];
            wordInGrid = false;
            for (let i = 0; i < gridheight; i++) {
                for (let j = 0; j < gridwidth; j++) {
                    if (startingRoom.grid[i][j].word == word) {
                        wordInGrid = true; 
                    }
                }
            }
        } while (wordInGrid == true)
        return word;
    }

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
        let idx = playerList.map(function(player) {
            return player.socketID;
        }).indexOf(socketID);
        playerList.splice(idx, 1);
        users[socketID].currentRoom = null;
        if (playerList.length <= 0) {
            delete games[roomName];
        } else if (games[roomName].hostSocketID == socketID) {
            console.log("new host");
            games[roomName].hostSocketID = playerList[0].socketID;
            socket.to(playerList[0].socketID).emit("setJoinHost", "host");
        }
        io.emit("gameUpdate", games);
    }
});

server.listen(80, () => {
    console.log('listening on *:80');
});