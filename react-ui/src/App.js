import React, { Component } from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import Column from './column/Column';
import dataService from './dataService';
import Clock from './clock/Clock';
import AddTaskModal from './addTaskModal/AddTaskModal';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      addTaskModalShow: false
    }
  }

  componentDidMount() {
    dataService
    .getColumns()
    .then((data) => {
      this.setState({columns: data})
    });
  }

  addTask = () => {
    this.setState({addTaskModalShow: true});
  }

  closeAddTaskModal = () => {
    this.setState({addTaskModalShow: false});
  }

  render() {
    let now = new Date();
    return (
      <div className="App">
        <div className="App-header">
          <Button 
            bsStyle='primary'
            onClick={this.addTask}
          > 
          + 
          </Button>
          <h2>
            <Clock />
          </h2>
        </div>
        <div className='App-content'>
          {this.state.columns.map(column => {         
            return <Column key={column.title} data={column} />
          })}
        </div>
        <AddTaskModal
          show={this.state.addTaskModalShow}
          onHide={this.closeAddTaskModal}
        />
      </div>
    );
  }
}

export default App;
