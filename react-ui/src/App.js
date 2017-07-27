import React, { Component } from 'react';
import './App.css';

import Time from 'react-time';

import Column from './column/Column'

class App extends Component {
  render() {
    let now = new Date();
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <Time value={now} format="DD/MM/YY HH:mm" />

          </h2>
        </div>
        <div className='App-content'>
          {this.props.columns.map(column => {         
            return <Column key={column.title} data={column} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
