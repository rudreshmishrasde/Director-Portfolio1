import React, { Component } from 'react';
import Films from '../Films/functionalIndex';
import './style.css';

class App extends Component {

  render() {
    return (
      <div style={{padding : "50px"}}>
        <Films />
      </div>
    );
  }
}

export default App;