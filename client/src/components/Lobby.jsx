import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setHost, setJoin, setGameId } from '../actions';
import { Container, Button } from 'react-bootstrap';

function Lobby(props) {
  function leaveGame() {
    props.socket.emit('leaveGame', props.gameId);
    props.setJoin(0);
    props.setHost(0);
    props.setGameId('');
  }

  function startGame() {
    props.socket.emit("startGame", props.gameId);
    
  }

  return (
    <Container className="d-flex flex-column align-items-center mt-3">
      <h1>{props.gameId}</h1>
      <div className="card mt-4 border-primary w-25 mb-2">
        <div className="card-header bg-primary text-white text-center py-2">
          Players in this lobby:
        </div>
        <div className="list-group ml-2 my-1">
          {props.openGames[props.gameId]?.players.map((key, i) => {
            let d = props.openGames[props.gameId]?.players[i];
            if (d.socketID == props.openGames[props.gameId].hostSocketID) {
              return (
                <div className="my-1">
                  <span className="badge badge-light p-2">{d.name}</span>
                  <span
                    className="badge badge-secondary p-2 float-right"
                    style={{ position: 'relative', right: '0.5rem' }}
                  >
                    Host
                  </span>
                </div>
              );
            } else {
              return (
                <div className="my-1">
                  <span className="badge badge-light p-2">{d.name}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
      {(props.host && props.openGames[props.gameId]?.players.length >= 2) ? (
        <Button onClick={startGame} variant="outline-success" className="w-25 mt-2">
          Start Game
        </Button>
      ) : (
        ''
      )}
      <Button
        variant="outline-danger"
        onClick={leaveGame}
        className="w-25 mt-2"
      >
        Leave Game
      </Button>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    host: state.host,
    join: state.join,
    gameId: state.gameId,
    openGames: state.openGames
  };
}

const mapDispatchToProps = {
  setHost,
  setJoin,
  setGameId
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
