import React, { Component } from 'react';
import './Card.css';

import Dropdown from '../dropdown/Dropdown';
import FontAwesome from 'react-fontawesome';  
import moment from 'moment';
import EditTaskModal from './editTaskModal/EditTaskModal';
import SelectColumnTaskModal from './selectColumnTaskModal/SelectColumnTaskModal';
import CommentsTaskModal from './commentsTaskModal/CommentsTaskModal';
import ClientInfoModal from '../tasksPanel/clientInfoModal/ClientInfoModal';

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
    console.log('bbbbb')
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
      client
    } = this.props;

    console.log(this.props);
    const {
      disableMenu,
      disableCommentsButton
    } = this.props;
    console.log('disable menu ' + disableMenu)
    const dropdownTitle = <FontAwesome name='ellipsis-v' />;
    return (
      <div className="card">
        <div className="card__header">
          <span>{author} > {executor}</span>
          <div
            style={{
              display: disableMenu ? 'none' : ''
            }}
          >
            <Dropdown 
              className='card__header-dropdown'
              title={dropdownTitle}
            >
              <div onClick={this.replaceTask}>
                Переместить
              </div>
              <div onClick={this.editTask}>
                Редактировать
              </div>
              <div onClick={this.deleteTask}>
                Удалить
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="card__sub-header">
          <span
            className="card__responsible"
          >
            <FontAwesome name='eye' />
            {responsible}
          </span>
        </div>
        <div className="card__body">
          {text}
        </div>
        <div className="card__footer">
          {moment(date).format("DD/MM/YY HH:mm")}
          <div
            className="card__client"
            onClick={this.showClientInfo}
          >
            {client.name}
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
        />
        <CommentsTaskModal
          show={this.state.showCommentsTaskModal}
          onHide={this.closeCommentsTaskModal}
          {...this.props}
        />
        <ClientInfoModal
          show={this.state.showClientInfoModal}
          onHide={this.closeClientInfoModal}
          {...client}
        />
      </div>
    );
  }
}

export default Card;
