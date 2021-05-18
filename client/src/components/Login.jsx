import React from 'react'
import { Container, FormControl, InputGroup, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsername } from "../actions";

function Login(props) {

  function sendUsername() {
    let name = document.getElementById("username").value;
    if (name.length > 0) {
      props.setUsername(name);
    }
  }

  function checkUsername() {
    let name = document.getElementById("username").value;
    let label = document.getElementById("error");
    if (name.length <= 0) {
      label.textContent = "Please enter a username!";
    } else if (name.length > 16) {
      label.textContent = "Character limit for your username is 16!";
    } else {
      sendUsername();
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "100vh" }}>
      <InputGroup className="mb-1 w-50">
        <FormControl id="username"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={checkUsername}>CONFIRM USERNAME</Button>
        </InputGroup.Append>
      </InputGroup>
      <Form.Label className="text-danger" id="error"></Form.Label>
    </Container>
  )
}

const mapDispatchToProps = {
  setUsername
}

export default connect(null, mapDispatchToProps)(Login);