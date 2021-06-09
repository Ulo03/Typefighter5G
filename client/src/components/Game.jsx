import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import { setOpenGames } from "../actions";
import './styles/Game.css';

function Game(props) {

  useEffect(() => {
    props.socket.on("objects", (newGames) => {
      props.setOpenGames(newGames);
    });
  });

  function inputKeyUp(event) {
    if (event.key === 'Enter') {
      props.socket.emit("words", document.getElementById("wordInput").value);
      console.log(document.getElementById("wordInput").value);
      document.getElementById("wordInput").value = ""
      console.log(document.getElementById("wordInput").value);
    }
  }

  return (
    <Container style={{minHeight: "100vh", minWidth: "100vw"}} className="m-0 d-flex align-items-center justify-content-between">
      <div className="w-85 mx-5">
        {
          props.openGames[props.gameId].grid.map((e, i) => {
            return (<Row>
              {
                e.map((e2, i2) => {
                  return (<Col className={`gamecol ${e2.player?.color}`}>{e2.word}</Col>);
                })
              }
            </Row>);
          })
        }
      </div>
      <div className="chat mx-5">
        <div className="scores">
          <div className="mb-2">SCORES</div>
          <div>
            {props.openGames[props.gameId].players.map((e, i) => {
              return (<div className={`text-left my-1 p-3 badge w-100 ${e.color}`}>
              <span>{e.name}</span>
              <span className={"float-right"}>{e.score} / 5</span>
            </div>);
            })}
          </div>
        </div>
        <div className="control">
          <input onKeyUp={inputKeyUp.bind(this)} id="wordInput" autoFocus={true} placeholder="Enter a word..." type="text" className="w-100"></input>
        </div>
      </div>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    openGames: state.openGames,
    gameId: state.gameId,
    socket: state.socket
  };
}

const mapDispatchToProps = {
  setOpenGames
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);