import React, { Component } from 'react';
import './TasksPannel.css';
import {Button} from 'react-bootstrap';
import Column from '../column/Column';
import dataService from '../dataService';
import Clock from '../clock/Clock';
import AddTaskModal from '../addTaskModal/AddTaskModal';

class TasksPannel extends Component {

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
    return (
      <div className="tasks-pannel">
        <div className="tasks-pannel-header">
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
        <div className='tasks-pannel-content'>
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

export default TasksPannel;
