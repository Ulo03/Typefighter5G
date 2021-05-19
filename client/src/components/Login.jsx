import React, { useEffect } from 'react'
import { Container, FormControl, InputGroup, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsername } from "../actions";

function Login(props) {

  useEffect(() => {
    const enterListener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        document.getElementById("confirmButton").click();
      }
    };
    document.addEventListener("keydown", enterListener);
    return () => {
      document.removeEventListener("keydown", enterListener);
    };
  },[]);

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
          autoFocus={true}
        />
        <InputGroup.Append>
          <Button id="confirmButton" variant="outline-secondary" onClick={checkUsername}>CONFIRM USERNAME</Button>
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