import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { setSocket } from "../actions";

function Typefighter(props) {

  useEffect(() => {
    props.setSocket(io("http://192.168.8.164:3001"));
  }, []);

  useEffect(() => {
    if (!props.socket) return;
    props.socket.on("connect", () => {
      props.socket.emit("clientMessage", `${props.username} connected!`);
    });

  }, [props.socket])

  return (
    <div>
      Typefighter works!
    </div>
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