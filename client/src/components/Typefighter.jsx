import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { setSocket } from "../actions";
import { Container } from "react-bootstrap";

function Typefighter(props) {

  useEffect(() => {
    props.setSocket(io("http://127.0.0.1:3001"));
  });

  useEffect(() => {
    if (!props.socket) return;
    props.socket.on("connect", () => {
      props.socket.emit("clientMessage", props.username);
    });
  }, [props.socket])

  return (
    <Container>
      Typefighter works!
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    username: state.username,
    socket: state.socket
  }
}

const mapDispatchToProps = {
  setSocket
}

export default connect(mapStateToProps, mapDispatchToProps)(Typefighter);