import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import Typefighter from "./Typefighter";
import Login from "./Login";

function App(props) {

  return (props.username ? <Typefighter /> : <Login />);
}

function mapStateToProps(state) {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps, null)(App);