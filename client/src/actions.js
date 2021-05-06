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

export function setCell(row, col, state) {
  return {
    type: "SET_CELL",
    row: row,
    col: col,
    state: state
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