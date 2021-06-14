// REDUX ACTIONS
export function setUsername(name) {
  return {
    type: "SET_USERNAME",
    data: name
  }
}

export function setSocket(socket) {
  return {
    type: "SET_SOCKET",
    data: socket
  }
}

export function setHost(val) {
  return {
    type: "SET_HOST",
    data: val
  }
}

export function setJoin(val) {
  return {
    type: "SET_JOIN",
    data: val
  }
}

export function setSocketURL(url) {
  return {
    type: "SET_SOCKET_URL",
    data: url
  }
}

export function setGameId(id) {
  return {
    type: "SET_GAME_ID",
    data: id
  }
}

export function setOpenGames(games) {
  return {
    type: "SET_OPEN_GAMES",
    data: games
  }
}

export function setOnlineCount(count) {
  return {
    type: "SET_ONLINE_COUNT",
    data: count
  }
}

export function setGame(gameName, game) {
  return {
    type: "SET_GAME",
    data: {
      gameName, game
    }
  }
}