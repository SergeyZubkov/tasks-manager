import React, { Component } from 'react';
import './Column.css';

import Card from '../card/Card';
import {Panel} from 'react-bootstrap';
import _ from 'lodash';
import taskDataService from '../data/taskDataService';

class Column extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen:true
    }

    this.identifyStatePanel = this.identifyStatePanel.bind(this);

  }

  componentDidMount() {
    this.identifyStatePanel();
  }

  identifyStatePanel() {
    if (window.matchMedia("(max-width: 880px)").matches) {
      this.setState({isOpen: false});
    } else {
      this.setState({isOpen: true});
    }
  }

  handleClick = () => {
    this.setState((state) => {
      return {
        isOpen: !state.isOpen
      };
    });

  }

  handleClick = () => {
    this.setState((state) => {
      return {
        isOpen: !state.isOpen
      };
    });

  }

  deleteTask = (id) => {
    taskDataService
    .remove(id)
  }

  sortByDateNewFirst(list) {
    return _.sortBy(
      list, 
      item => +new Date(item.date)
    ).reverse();
  }

  sortByPriority(list) {
    return _.sortBy(
      list,
      item => item.priority||list.length
    );
  }

  render() {
    const cards = this.sortByPriority(
      this.sortByDateNewFirst(this.props.cards)
    );

    return (
      <div className="column">
         <div 
            className="column__header"
            onClick={this.handleClick}
          > 
            <h3>
              {this.props.title} 
            </h3>
            <span
                className='column__counter'
            >
              {this.props.cards.length}
            </span>
          </div>
        <Panel
          className='column__panel'
          expanded={this.state.isOpen}
          collapsible
        >
          {cards.map(card => {
            return <Card key={card._id} onDeleteTask={this.deleteTask} {...card}/>
          })}
       </Panel>
      </div>
    );
  }
}

export default Column;
