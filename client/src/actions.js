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