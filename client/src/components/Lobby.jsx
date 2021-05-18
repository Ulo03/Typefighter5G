import React from 'react'
import { Container } from "react-bootstrap";
import { setSocket, setHost, setJoin, setGameId } from "../actions";
import { connect } from "react-redux";

function Lobby(props) {

  function leaveGame() {
    props.socket.emit("leaveGame", props.gameId);
    props.setJoin(0);
    props.setHost(0);
    props.setGameId("");
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}><h1 onClick={leaveGame}>Lobby</h1></Container>
  )
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    host: state.host,
    join: state.join,
    gameId: state.gameId
  }
}

const mapDispatchToProps = {
  setHost,
  setJoin,
  setGameId
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);