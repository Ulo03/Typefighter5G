import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

var change = true;

function Results(props) {
    return (
      <Container style={{minWidth: "50vw"}} className="d-flex align-items-center flex-column text-center mt-5">
        <h3>Last Game</h3>
        <div className="">
          {
            props.openGames[props.gameId].grid.map((e, i) => {
              return (<Row>
                {
                  e.map((e2, i2) => {
                    return (<Col className={`rescol ${e2.player?.color}`}>&nbsp;</Col>);
                  })
                }
              </Row>);
            })
          }
        </div>
      </Container>
    )
}

function mapStateToProps(state) {
  return {
    openGames: state.openGames,
    gameId: state.gameId
  }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);