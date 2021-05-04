import React from 'react'
import { Container, FormControl, InputGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setUsername } from "../actions";

function Login(props) {

  function test() {
    let name = document.getElementById("username").value;
    if (name.length > 0) {
      props.setUsername(name);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <InputGroup className="mb-3 w-50">
        <FormControl id="username"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={test}>CONFIRM USERNAME</Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  )
}

const mapDispatchToProps = {
  setUsername
}

export default connect(null, mapDispatchToProps)(Login);