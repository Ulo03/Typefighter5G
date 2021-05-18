import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { setSocket, setHost, setJoin, setOpenGames, setOnlineCount } from "../actions";
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
      props.socket.emit("getOnlineCount", "");
    });
    
    props.socket.on("gameUpdate", (gameList) => {
      if (props.join || props.host) return;
      props.setOpenGames(gameList);
    });
    props.socket.on("onlineCount", (count) => {
      if (props.join || props.host) return;
      props.setOnlineCount(count - 1);
    });

  }, [props.socket]);

  useEffect(() => {
    if (!props.socket) return;
    if (props.host || props.join) return;
    props.socket.emit("getOnlineCount", "");
    props.socket.emit("getGameUpdate", "");
  }, [props.host, props.join]);

  function createGame() {
    props.socket.emit("createGame", "Room1");
    props.setHost(1);
  }

  return (
    (!props.host && !props.join) ?  (<Container style={{ minHeight: "100vh" }}>
    <div className="text-center">
      <Button variant="outline-primary" className="my-4 btn-lg w-50" onClick={() => createGame()}>HOST GAME</Button>
      <span className="ml-4 badge badge-success p-2">Online Players: {props.onlineCount}</span>
      <div className="gameList d-flex flex-column align-items-center">
        {props.openGames.map((e, i) => {
          return (<div className="w-50 btn btn-outline-secondary my-1" key={e?.id}>{e.name}'s Game</div>);
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
  setOnlineCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Typefighter);