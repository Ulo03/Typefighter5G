const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

const randomWords = require('./words');
const { defaultMaxListeners } = require('events');
const { clear } = require('console');

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
            color: "",
            score: 0
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
                    ended: false,
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
            currentSocket.on("words", function(word) {
                if (!startingRoom.ended == true) {
                    validateWord(startingRoom, word, p.socketID);    
                }
                if (hasGameEnded(roomName)) {
                    clearScores(roomName);
                    startingRoom.ended = true;
                    startingRoom.started = false;
                    io.to(roomName).emit("gameUpdate", games);
                } else {
                    
                }
                io.to(roomName).emit("objects", games);
            });
        }
        startingRoom.ended = false;
        startingRoom.started = true;
        io.emit("gameUpdate", games);
    });

    function clearScores(roomName) {
        for (let player of games[roomName].players) {
            player.score = 0;
        }
    }

    //checks if a player has won and sets scores of the players
    function hasGameEnded(roomName) {
        clearScores(roomName);
        let hasEnded = false;
        //check five in a row horizontal
        let currentPlayer;
        let currentScore = 0;
        for (let i = 0; i < gridheight; i++) {
            currentScore = 0;
            currentPlayer = null;
            for (let j = 0; j < gridwidth; j++) {
                if (games[roomName].grid[i][j].player) {
                    if (currentPlayer == games[roomName].grid[i][j].player) {
                        currentScore += 1;
                        if (currentScore > currentPlayer.score) {
                            currentPlayer.score = currentScore;
                            if (currentScore == gridwidth) {
                                hasEnded = true;
                            }
                        }
                    } else {
                        currentPlayer = games[roomName].grid[i][j].player;
                        currentScore = 1;
                        if (currentScore > currentPlayer.score) {
                            currentPlayer.score = currentScore;
                        }
                    }
                } else {
                    if (currentPlayer) {
                        currentPlayer = null;
                        currentScore = 0;
                    } 
                }
            }
        }
        //check five in a row vertical 
        if (!hasEnded) {
            for (let i = 0; i < gridheight; i++) {
                currentScore = 0;
                currentPlayer = null;
                for (let j = 0; j < gridwidth; j++) {
                    if (games[roomName].grid[j][i].player) {
                        if (currentPlayer == games[roomName].grid[j][i].player) {
                            currentScore += 1;
                            if (currentScore > currentPlayer.score) {
                                currentPlayer.score = currentScore;
                                if (currentScore == gridwidth) {
                                    hasEnded = true;
                                }
                            }
                        } else {
                            currentPlayer = games[roomName].grid[j][i].player;
                            currentScore = 1;
                            if (currentScore > currentPlayer.score) {
                                currentPlayer.score = currentScore;
                            }
                        }
                    } else {
                        if (currentPlayer) {
                            currentPlayer = null;
                            currentScore = 0;
                        } 
                    }
                }
            }
        }

        //check five in a row diagonal - left to right

        if (!hasEnded) {
            currentPlayer = null;
            currentScore = 0;
            for (let i = 0; i < gridwidth; i++) {
                if (games[roomName].grid[i][i].player) {
                    if (currentPlayer == games[roomName].grid[i][i].player) {
                        currentScore += 1;
                        if (currentScore > currentPlayer.score) {
                            currentPlayer.score = currentScore;
                            if (currentScore == gridwidth) {
                                hasEnded = true;
                            }
                        }
                    } else {
                        currentPlayer = games[roomName].grid[i][i].player;
                        currentScore = 1;
                        if (currentScore > currentPlayer.score) {
                            currentPlayer.score = currentScore;
                        }
                    }
                } else {
                    if (currentPlayer) {
                        currentPlayer = null;
                        currentScore = 0;
                    } 
                }
            }
        }

        

        //check five in a row diagonal - right to left
        if (!hasEnded) {
            currentPlayer = null;
            currentScore = 0;
            for (let i = gridwidth - 1; i >= 0; i--) {
                if (games[roomName].grid[i][(gridwidth - 1) - i].player) {
                    if (currentPlayer == games[roomName].grid[i][(gridwidth - 1) - i].player) {
                        currentScore += 1;
                        if (currentScore > currentPlayer.score) {
                            currentPlayer.score = currentScore;
                            if (currentScore == gridwidth) {
                                hasEnded = true;
                            }
                        }
                    } else {
                        currentPlayer = games[roomName].grid[i][(gridwidth - 1) - i].player;
                        currentScore = 1;
                        if (currentScore > currentPlayer.score) {
                            currentPlayer.score = currentScore;
                        }
                    }
                } else {
                    if (currentPlayer) {
                        currentPlayer = null;
                        currentScore = 0;
                    } 
                }
            }
        }
        
        return hasEnded;
    }

    function validateWord(room, inputWord, playerSocketID) {
        let wordFound = false;
        for (let i = 0; i < room.grid.length && wordFound == false; i++) {
            for (let j = 0; j < room.grid[0].length && wordFound == false; j++) {
                if (room.grid[i][j].word == inputWord) {
                    room.grid[i][j].player = users[playerSocketID];
                    room.grid[i][j].player.name;
                    room.grid[i][j].word = getRandomWord();
                    wordFound = true;
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
        users[socket.id].color = "";
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
        //TODO: falls er in einem spiel war den Spieler aus zelle löschen
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

server.listen((process.env.PORT || 3000), () => {
    console.log('listening on *:3000');
});