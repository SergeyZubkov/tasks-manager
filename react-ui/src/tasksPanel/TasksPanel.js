import React, { Component } from 'react';
import './TasksPanel.css';
import {Button, Grid, Row} from 'react-bootstrap';
import Column from '../column/Column';
import taskDataService from '../data/taskDataService';
import userDataService from '../data/userDataService';
import AddTaskModal from './addTaskModal/AddTaskModal';
import FontAwesome from 'react-fontawesome';
import AuthService from '../AuthService';
import ClientsModal from './clientsModal/ClientsModal';


class TasksPannel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showAddTaskModal: false,
      showClientsModal: false,
      showClientInfoModal: false,
      columnsTitles: [
        "Задачи",
        "Выполняются",
        "Завершенные",
        "Замороженные"
      ],
      tasksCards: [],
      doingCards: [],
      pendingCards: [],
      completeCards: [],
      freezingCards: [],
      tasks: [],
      clients: []
    }
  }

  componentDidMount() {
    taskDataService.on('change', this.fetch);

    this.fetch();

    this.setState({currentUser: userDataService.getCurrentUser()});

  }

  componentWillUnmount() {
    taskDataService.removeListener('change', this.fetch);
  }

  fetch = ()  => {
    taskDataService
    .getTasks()
    .then((data) => {
      this.setState({tasks: data});
      this.sortingTaskForColumns();
    });
  }

  sortingTaskForColumns() {
    const columnTasksCards = [];
    const columnDoingCards = [];
    const columnCompleteCards = [];
    const columnFreezingCards = [];
    const tasks = this.state.tasks;

    tasks.forEach(task => {
      switch (task.column) {
        case 'Задачи':
          columnTasksCards.push(task);
          break;
        case 'Выполняются':
          columnDoingCards.push(task);
          break;
        case 'Завершенные':
          columnCompleteCards.push(task);
          break;
        case 'Замороженные':
          columnFreezingCards.push(task);
          break;
        default:
          break;
      }
    });

    this.setState({
      tasksCards: columnTasksCards,
      doingCards: columnDoingCards,
      completeCards: columnCompleteCards,
      freezingCards: columnFreezingCards
    });

  }

  addTask = () => {
    this.setState({showAddTaskModal: true});
  }

  showClients = () => {
    this.setState({showClientsModal: true});
  }

  logOut = () => {
    AuthService.logOut();
    this.props.history.push('/login')
  }

  closeAddTaskModal = () => {
    this.setState({showAddTaskModal: false});
  }

  closeClientsModal = () => {
    this.setState({showClientsModal: false});
  }

  render() {
    const matching = {
      "Задачи": this.state.tasksCards,
      "Выполняются": this.state.doingCards,
      "Завершенные": this.state.completeCards,
      "Замороженные": this.state.freezingCards
    }
    return (
      <div className="tasks-panel">
        <div className="tasks-panel-header">
          <Grid>
            <Row>
              <Button
                bsStyle='primary'
                onClick={this.addTask}
              >
                <FontAwesome name='plus-square-o' />
                <div className="hidden-xs">&nbsp;Добавить задачу</div>
              </Button>
              <Button
                bsStyle='primary'
                onClick={this.showClients}
              >
                <FontAwesome name='address-card-o' />
                <div className="hidden-xs">&nbsp;Клиенты</div>
              </Button>
              <Button
                bsStyle='primary'
                onClick={this.logOut}
              >
                <FontAwesome name='sign-out' />
                <div className="hidden-xs">&nbsp;Выйти</div>
              </Button>
            </Row>
          </Grid>
        </div>
        <div className='tasks-panel-content'>
          {this.state.columnsTitles.map(columnTitle => {
            const cards = matching[columnTitle];
            return <Column
              key={columnTitle}
              title={columnTitle}
              cards={cards}
              filter={columnTitle === 'Завершенные'}
            />
          })}
        </div>
        <AddTaskModal
          show={this.state.showAddTaskModal}
          onHide={this.closeAddTaskModal}
        />
        <ClientsModal
          show={this.state.showClientsModal}
          onHide={this.closeClientsModal}
        />
      </div>
    );
  }
}

export default TasksPannel;
