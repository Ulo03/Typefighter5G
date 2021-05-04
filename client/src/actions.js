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