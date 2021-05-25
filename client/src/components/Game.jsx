import React from 'react'
import { connect } from 'react-redux'
import connect from "react-redux";

function Game() {
  return (
    <div>
      GAME
    </div>
  )
}

function mapStateToProps(state) {
  return {
    
  };
}

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);