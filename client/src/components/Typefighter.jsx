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
    });

    props.socket.on("gameUpdate", (gameList) => {
      props.setOpenGames(gameList);
    });
    props.socket.on("onlineCount", (count) => {
      props.setOnlineCount(count);
    });

  }, [props.socket]);

  function createGame() {
    props.socket.emit("createRoom", "");
    props.setHost(1);
  }

  return (
    (!props.host && !props.join) ?  (<Container style={{ minHeight: "100vh" }}>
    <div className="text-center">
      <Button variant="outline-primary" className="my-4 btn-lg w-50" onClick={() => createGame()}>HOST GAME</Button>
      <span className="mr-4">Online Players: {props.onlineCount}</span>
      <div className="gameList">
        {props.openGames.map((e, i) => {
          return (<div className="w-50 btn btn-outline-secondary" key={e.id}>{e.name}'s Game</div>);
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