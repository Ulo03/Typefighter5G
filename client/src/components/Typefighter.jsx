import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { setSocket, setHost, setJoin, setOpenGames, setOnlineCount, setGameId } from "../actions";
import { Container, Button } from "react-bootstrap";
import Lobby from "./Lobby";

function Typefighter(props) {

  useEffect(() => {
    props.setSocket(io(props.socketURL));
  }, [props.socketURL]);

  useEffect(() => {
    if (!props.socket) return;
    props.socket.on("connect", () => {
      props.socket.emit("sendUsername", props.username);
    });
    
    props.socket.on("gameUpdate", (gameList) => {
      if (props.join || props.host) return;
      props.setOpenGames(gameList);
    });
    props.socket.on("onlineCount", (count) => {
      if (props.join || props.host) return;
      props.setOnlineCount(count);
    });

  }, [props.socket]);

  // useEffect(() => {
  //   if (!props.socket) return;
  //   if (props.host || props.join) return;

  // }, [props.host, props.join]);

  function createGame() {
    props.socket.emit("createGame", props.username);
    props.setGameId(props.username);
    props.setHost(1);
  }

  function joinGame(roomName) {
    props.socket.emit("joinGame", roomName);
    props.setGameId(roomName);
    props.setJoin(1);
  }

  return (
    (!props.host && !props.join) ?  (<Container style={{ minHeight: "100vh" }}>
    <div className="text-center">
      <Button variant="outline-primary" className="my-4 btn-lg w-50 position-relative" onClick={() => createGame()}>HOST GAME<span className="ml-4 badge badge-primary p-2" style={{ position: "absolute", top: "50%", right: "0.5rem", transform: "translate(0, -50%)" }}>Online Players: {props.onlineCount}</span></Button>
      <div className="gameList d-flex flex-column align-items-center">
        {Object.keys(props.openGames).map((key, i) => {
          let e = props.openGames[key];
          return (<div className="w-50 btn btn-outline-secondary my-1" key={e.socketID} onClick={() => joinGame(e.name)}>{e.name}'s Game</div>);
        })}
      </div>
    </div>
  </Container>) : <Lobby />
  )
}

function mapStateToProps(state) {
  return {
    username: state.username,
    socketURL: state.socketURL,
    socket: state.socket,
    host: state.host,
    join: state.join,
    openGames: state.openGames,
    onlineCount: state.onlineCount,
  }
}

const mapDispatchToProps = {
  setSocket,
  setHost,
  setJoin,
  setOpenGames,
  setOnlineCount,
  setGameId
}

export default connect(mapStateToProps, mapDispatchToProps)(Typefighter);