import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { setHost, setJoin, setGameId } from "../actions";
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
      <Button onClick={leaveGame}>Leave Game</Button>
      <div className="card float-right mt-5 border-primary ">
        <div className="card-header bg-primary pr-5 pl-5 text-white">
          Players in this lobby:
        </div>
        <div className="list-group list-group-flush m-3">
          {Object.keys(props.openGames).map((key, i) => {
            let e = props.openGames[key];
            if (e?.name == props.gameId) {
              return e.players.map((key2, i) => {
                let d = e.players[i];
                if (d.socketID == e.hostSocketID) {
                  return (<div className="mb-3" >{d?.name} <span className="ml-4 badge badge-secondary p-2" style={{ position: "relative", right: "0.5rem"}}>Host </span> </div>);
                } else {
                  return (<div className="mb-3"> {d?.name} </div>);
                }
              })
            }
          })}
        </div>
      </div>
      <h1 style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)" }} 
      >Lobby</h1>  
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