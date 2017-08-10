import React, { Component } from 'react';
import './TasksPanel.css';
import {Button, Grid, Row} from 'react-bootstrap';
import Column from '../column/Column';
import taskDataService from '../data/taskDataService';
import userDataService from '../data/userDataService';
import clientDataService from '../data/clientDataService';
import AddTaskModal from './addTaskModal/AddTaskModal';
import FontAwesome from 'react-fontawesome';
import AuthService from '../AuthService';
import AddClientModal from './addClientModal/AddClientModal';
import ClientsModal from './clientsModal/ClientsModal';


class TasksPannel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showAddTaskModal: false,
      showAddClientModal: false,
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
      completeCards: [],
      freezingCards: [],
      tasks: [],
      clients: []
    }
  }

  componentDidMount() {
    this.fetch();
    this.getClients();

    this.setState({currentUser: userDataService.getCurrentUser()});

    clientDataService.on('change', this.getClients)
    taskDataService.on('change', this.fetch);
  }

  componentWillUnmount() {
    taskDataService.removeListener('change', this.fetch);
    taskDataService.removeListener('change', this.getClients);
  }

  getClients = () => {
    clientDataService
    .getAll()
    .then((clients) => {
      console.log(clients);
      this.setState({
        clients
      });
    });
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
      console.log(task.column)
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

    console.log(columnTasksCards)

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

  addClient= () => {
    this.setState({showAddClientModal: true});
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

  closeAddClientModal = () => {
    this.setState({showAddClientModal: false});
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
              + Добавить задачу
              </Button>
              <Button 
                bsStyle='primary'
                onClick={this.addClient}
              > 
              + Добавить клиента
              </Button>
              <Button 
                bsStyle='primary'
                onClick={this.showClients}
              > 
                Клиенты
              </Button>
              <Button 
                bsStyle='primary'
                onClick={this.logOut}
              > 
                <FontAwesome name='sign-out' />
                &nbsp;Выйти
              </Button>
            </Row>
          </Grid>
        </div>
        <div className='tasks-panel-content'>
          {this.state.columnsTitles.map(columnTitle => {
            const cards = matching[columnTitle];         
            return <Column key={columnTitle} title={columnTitle} cards={cards} />
          })}
        </div>
        <AddTaskModal
          show={this.state.showAddTaskModal}
          onHide={this.closeAddTaskModal}
          clients={this.state.clients}
        />
        <AddClientModal
          show={this.state.showAddClientModal}
          onHide={this.closeAddClientModal}
        />
        <ClientsModal
          show={this.state.showClientsModal}
          onHide={this.closeClientsModal}
          clients={this.state.clients}
        />
      </div>
    );
  }
}

export default TasksPannel;
