import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import './styles/Game.css';

function Game() {
  return (
    <Container style={{minHeight: "100vh", minWidth: "100vw"}} className="m-0 d-flex align-items-center justify-content-between">
      <div className="w-85 mx-5">
        <Row>
          <Col>0-0</Col>
          <Col>0-1</Col>
          <Col>0-2</Col>
          <Col>0-3</Col>
          <Col>0-4</Col>
        </Row>
        <Row>
          <Col>1-0</Col>
          <Col>1-1</Col>
          <Col>1-2</Col>
          <Col>1-3</Col>
          <Col>1-4</Col>
        </Row>
        <Row>
          <Col>2-0</Col>
          <Col>2-1</Col>
          <Col>2-2</Col>
          <Col>2-3</Col>
          <Col>2-4</Col>
        </Row>
        <Row>
          <Col>3-0</Col>
          <Col>3-1</Col>
          <Col>3-2</Col>
          <Col>3-3</Col>
          <Col>3-4</Col>
        </Row>
        <Row>
          <Col>4-0</Col>
          <Col>4-1</Col>
          <Col>4-2</Col>
          <Col>4-3</Col>
          <Col>4-4</Col>
        </Row>
      </div>
      <div className="chat mx-5">
        <div className="display">
          DISPLAY
        </div>
        <div className="control">
          CONTROL
        </div>
      </div>
    </Container>
  )
}

function mapStateToProps(state) {
  return {
    
  };
}

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);