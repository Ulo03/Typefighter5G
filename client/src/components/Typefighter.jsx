import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { setSocket, setHost, setJoin, setOpenGames, setOnlineCount, setGameId } from "../actions";
import { Container, Button, InputGroup, FormControl } from "react-bootstrap";
import Lobby from "./Lobby";
import Game from "./Game";

function Typefighter(props) {

  useEffect(() => {
    props.setSocket(io(props.socketURL));

    const createListener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        document.getElementById("createButton").click();
      }
    };
    document.addEventListener("keydown", createListener);
    return () => {
      document.removeEventListener("keydown", createListener);
    };
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

    props.socket.on("setJoinHost", (value) => {
      if (value == "join") {
        props.setJoin(true);
        props.setHost(false);
      } else if (value == "host") {
        props.setHost(true);
        props.setJoin(false);
        console.log("now host");
      }
    });

  }, [props.socket]);

  // useEffect(() => {
  //   if (!props.socket) return;
  //   if (props.host || props.join) return;

  // }, [props.host, props.join]);

  function createGame() {
    let input = document.getElementById("gameName");
    if (!input.value) return;
    let gameName = input.value;
    props.socket.emit("createGame", gameName);
    props.socket.once("response", (response) => {
      if (response === "200") {
        props.setGameId(gameName);
        props.setHost(1);
      } else {
        alert(response);
      }
    });
  }

  function joinGame(roomName) {
    props.socket.emit("joinGame", roomName);
    props.socket.once("response", (response) => {
      if (response === "200") {
        props.setGameId(roomName);
        props.setJoin(1);
      } else {
        alert(response);
      }
    });
  }

  return (
    (!props.host && !props.join) ?  (<Container style={{ minHeight: "100vh" }}>
    <div className="text-center">
    <div className="d-flex flex-column align-items-center">
    <InputGroup className="w-50 d-flex align-items-center">
      <FormControl id="gameName"
        placeholder="Name your Lobby..."
        aria-label="Name your Lobby..."
        aria-describedby="basic-addon2"
        autoFocus={true}
      />
      <InputGroup.Append>
        <Button variant="outline-primary" id="createButton" className="my-4 position-relative" onClick={() => createGame()}>HOST GAME<span className="ml-4 badge badge-primary p-1">Online Players: {props.onlineCount}</span></Button>
      </InputGroup.Append>
    </InputGroup>
    </div>
      <div className="gameList d-flex flex-column align-items-center">
        {Object.keys(props.openGames).map((key, i) => {
          let e = props.openGames[key];
          if (e.players.length < e.maxPlayers) {
            return (<div className="w-50 btn btn-outline-secondary my-1 position-relative" key={e.socketID} onClick={() => joinGame(e.name)}>{e.name}<span className="ml-4 badge badge-secondary p-2" style={{ position: "absolute", top: "50%", right: "0.5rem", transform: "translate(0, -50%)" }}>Players: {e.players.length}</span> </div>);
          }
        })}

      </div>
    </div>
  </Container>) : (!props.openGames[props.gameId]?.started) ? <Lobby /> : <Game />
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
    gameId: state.gameId
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