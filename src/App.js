import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import axios from 'axios'

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Map />
        </main>
      </div>
    );
  }
}

export default App;
