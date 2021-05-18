import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import { io } from "socket.io-client";

const initialState = {
  username: "",
  socketURL: "http://192.168.43.11:80",
  socket: io(),
  onlineCount: 0,
  grid: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  host: 0,
  join: 0,
  gameId: "",
  openGames: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.data };
    case "SET_SOCKET":
      return { ...state, socket: action.data };
    case "SET_CELL":
      return {...state, grid: state.grid.map((e, i) => {
        if (i !== action.row) return e;
        return e.map((e2, i2) => {
          if (i2 !== action.col) return e2;
          return action.state;
        });
      })};
    case "SET_GRID":
      return { ...state, grid: action.data };
    case "SET_HOST":
      return { ...state, host: action.data };
    case "SET_JOIN":
      return { ...state, join: action.data };
    case "SET_SOCKET_URL":
      return { ...state, socketURL: action.data };
    case "SET_GAME_ID":
      return { ...state, gameId: action.data };
    case "SET_OPEN_GAMES":
      return { ...state, openGames: action.data };
    case "SET_ONLINE_COUNT":
      return { ...state, onlineCount: action.data };
    default:
      return state;
  }
}

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

