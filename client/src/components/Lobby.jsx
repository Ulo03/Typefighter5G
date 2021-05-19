import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { setSocket, setHost, setJoin, setOpenGames, setOnlineCount, setGameId } from "../actions";
import { Container, Button } from "react-bootstrap";

function Lobby(props) {

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

  function leaveGame() {
    props.socket.emit("leaveGame", props.gameId);
    props.setJoin(0);
    props.setHost(0);
    props.setGameId("");
  }

  return (
    <Container style={{ minHeight: "100vh" }}>
      <div class="card position-relative float-right">
        <div class="card-header">
          Players
        </div>
        <ul class="list-group list-group-flush">
          {Object.keys(props.openGames).map((key, i) => {
            let e = props.openGames[key];
            if (e?.name == props.gameId) {
              return e.players.map((key2, i) => {
                let d = e.players[i];
                return (<li> {d?.name} </li>);
              })
            }
          })}
        </ul>
      </div>
      <h1 style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)" }} 
      onClick={leaveGame}>Lobby</h1>  
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    host: state.host,
    join: state.join,
    gameId: state.gameId,
    openGames: state.openGames
  }
}

const mapDispatchToProps = {
  setHost,
  setJoin,
  setGameId
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);