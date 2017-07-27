import React, { Component } from 'react';
import './Card.css';

import Dropdown from '../dropdown/Dropdown';
import FontAwesome from 'react-fontawesome';  

class Card extends Component {
  constructor(props) {
    super(props);
    
    this.state = {

    }
  }
  render() {
    const {
      author,
      executor,
      title,
      text,
      dateCreate,
      comments
    } = this.props.data;
    const dropdownTitle = <FontAwesome name='ellipsis-v' />;
    return (
      <div className="card">
        <div className="card__header">
          {author} <i>></i> {executor}
          <Dropdown 
            className='card__header-dropdown'
            title={dropdownTitle}
          >
            <div onClick={this.replaceCard}>
              Переместить
            </div>
            <div onClick={this.replaceCard}>
              Редактировать
            </div>
            <div onClick={this.replaceCard}>
              Удалить
            </div>
          </Dropdown>
        </div>
        <div className="card__body">
          {text}
        </div>
        <div className="card__footer">
          {dateCreate}
          <div className="card__comments">
            <FontAwesome name='comments' />
            {comments.length}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
