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

  return (
    <Container className="d-flex flex-column align-items-center mt-3">
      <h1>{props.gameId}</h1>
      <div className="card mt-4 border-primary w-25">
        <div className="card-header bg-primary text-white text-center">
          Players in this lobby:
        </div>
        <div className="list-group ml-3 my-1">
          {Object.keys(props.openGames).map((key, i) => {
            let e = props.openGames[key];
            if (e?.name == props.gameId) {
              return e.players.map((key2, i) => {
                let d = e.players[i];
                if (d.socketID == e.hostSocketID) {
                  return (
                    <div className="my-1">
                      {d?.name}{' '}
                      <span
                        className="ml-3 badge badge-secondary p-2 float-right"
                        style={{ position: 'relative', right: '0.5rem' }}
                      >
                        Host
                      </span>
                    </div>
                  );
                } else {
                  return <div className="my-1"> {d?.name} </div>;
                }
              });
            }
          })}
        </div>
      </div>
      <Button onClick={leaveGame} className="w-25 mt-4">Leave Game</Button>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    host: state.host,
    join: state.join,
    gameId: state.gameId,
    openGames: state.openGames,
  };
}

const mapDispatchToProps = {
  setHost,
  setJoin,
  setGameId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
