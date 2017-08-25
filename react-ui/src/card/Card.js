import React, { Component } from 'react';
import './Card.css';
import _ from 'lodash';
import UserDataService from '../data/userDataService';

import Dropdown from '../dropdown/Dropdown';
import FontAwesome from 'react-fontawesome';  
import {Label} from 'react-bootstrap';
import moment from 'moment';
import EditTaskModal from './editTaskModal/EditTaskModal';
import SelectColumnTaskModal from './selectColumnTaskModal/SelectColumnTaskModal';
import CommentsTaskModal from './commentsTaskModal/CommentsTaskModal';
import ClientInfoModal from '../tasksPanel/clientInfoModal/ClientInfoModal';
import DeadlineProgress from './deadlineProgress/DeadlineProgress';
import Linkify from 'react-linkify';

class Card extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showEditTaskModal: false,
      showSelectColumnTaskModal: false,
      showCommentsTaskModal: false,
      showClientInfoModal: false
    }
  }

  deleteTask = () => {
    this.props.onDeleteTask(this.props._id);
  }

  closeEditTaskModal = () => {
    this.setState({
      showEditTaskModal: false
    });
  }

  getColumnsForTaskMove = () => {
    const [
      ,
      userIsExecutor,
      userIsResponsible
    ] = UserDataService.getUserRolesForTask(this.props);

    console.log(userIsResponsible);

    if (userIsExecutor) {
      return ['Выполняются','Завершенные', 'Замороженные']; 
    } else if (userIsResponsible) {
      return ['Выполняются', 'Замороженные']
    } else {
      return [];
    }
  }

  editTask = () => {
    this.setState({
      showEditTaskModal: true
    });
  }

  closeSelectColumnTaskModal = () => {
    this.setState({
      showSelectColumnTaskModal: false
    });
  }

  replaceTask = () => {
    this.setState({
      showSelectColumnTaskModal: true
    });
  }

  closeCommentsTaskModal = () => {
    this.setState({
      showCommentsTaskModal: false
    });
  }

  closeClientInfoModal = () => {
    this.setState({
      showClientInfoModal: false
    });
  }

  showClientInfo = () => {
    this.setState({showClientInfoModal: true});
  }

  openComments = () => {
    this.setState({
      showCommentsTaskModal: true
    });
  }

  render() {
    const {
      author,
      executor,
      text,
      date,
      comments,
      responsible,
      column,
      _id,
      client,
      deadline
    } = this.props;

    const {
      disableMenu,
      disableCommentsButton,
    } = this.props;

    const [
      userIsAuthor,
      userIsExecutor,
      userIsResponsible
    ] = UserDataService.getUserRolesForTask(this.props);
    const dropdownTitle = <FontAwesome name='ellipsis-v' />;
    return (
      <div className="card">
        <div className="card__header">
          <div>
            <div className="author">
              <Label bsStyle='primary'> создал: </Label>  {author}
            </div>
            <div className="executor">
              <Label bsStyle='info'> исполнитель: </Label> {executor}
            </div>
            <div className="responsible">
              <Label bsStyle='success'>ответственный:</Label> {responsible}
            </div>
          </div>
          <div
            style={{
              display: disableMenu||!userIsAuthor&&!userIsExecutor&&!userIsResponsible ? 'none' : ''
            }}
          >
            <Dropdown   
              className='card__header-dropdown'
              title={dropdownTitle}
            >
              <div 
                style={{
                  display: userIsResponsible|| userIsExecutor
                  ? '' : 'none'
                }}
                onClick={this.replaceTask}>
                Переместить
              </div>
              <div 
                style={{
                  display: userIsAuthor ? '' : 'none'
                }}
                onClick={this.editTask}
              >
                Редактировать
              </div>
              <div 
                style={{
                  display: userIsAuthor ? '' : 'none'
                }}
                onClick={this.deleteTask}>
                Удалить
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="card__body">
          <Linkify>
            {text}
          </Linkify>
        </div>
        <div className="deadline">
          <i>выполнить до</i> {moment(deadline).format("DD/MM/YY")}
          <DeadlineProgress fromDate={new Date(date)} toDate={new Date(deadline)} />
        </div>
        <div className="card__footer">
          {moment(date).format("DD/MM/YY HH:mm")}
          <div
            className="card__client"
            onClick={this.showClientInfo}
          >
            {client ? client.name : ''}
          </div>
          <div 
            className="card__comments"
            onClick={this.openComments}
            style={{
              display: disableCommentsButton ? 'none' : ''
            }}
          >
            <FontAwesome name='comments' />
            {comments.length}
          </div>
        </div>

        <EditTaskModal
          show={this.state.showEditTaskModal}
          onHide={this.closeEditTaskModal}
          {...this.props}
        />
        <SelectColumnTaskModal
          show={this.state.showSelectColumnTaskModal}
          onHide={this.closeSelectColumnTaskModal}
          id={_id}
          column={column}
          columns={this.getColumnsForTaskMove()}
        />
        <CommentsTaskModal
          show={this.state.showCommentsTaskModal}
          onHide={this.closeCommentsTaskModal}
          {...this.props}
        />
        {client&&<ClientInfoModal
          show={this.state.showClientInfoModal}
          onHide={this.closeClientInfoModal}
          {...client}
        />}
      </div>
    );
  }
}

export default Card;
