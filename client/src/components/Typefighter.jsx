import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { setSocket, setHost, setJoin } from "../actions";
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
  }, [props.socket])

  return (
    (!props.host && !props.join) ? (<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center">
        <Button variant="outline-primary" className="mr-md-2 mb-2 btn-lg" onClick={() => props.setHost(1)}>HOST GAME</Button>
        <Button variant="outline-primary" className="ml-md-2 mb-2 btn-lg" onClick={() => props.setJoin(1)}>JOIN GAME</Button>
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
    join: state.join
  }
}

const mapDispatchToProps = {
  setSocket,
  setHost,
  setJoin
}

export default connect(mapStateToProps, mapDispatchToProps)(Typefighter);