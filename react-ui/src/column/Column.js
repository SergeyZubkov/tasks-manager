import React, { Component } from 'react';
import './Column.css';

import Card from '../card/Card';
import {Panel} from 'react-bootstrap';
import {listen} from 'dom-helpers/events';

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
      console.log('ggg')
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

  identifyStatePanel() {
    if (window.matchMedia("(max-width: 880px)").matches) {
      this.setState({isOpen: false});
    } else {
      console.log('ggg')
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

  render() {
    return (
      <div className="column">
         <div 
            className="column__header"
            onClick={this.handleClick}
          > 
            <h3>
              {this.props.data.title} 
            </h3>
            <span
                className='column__counter'
            >
              {this.props.data.cards.length}
            </span>
          </div>
        <Panel
          className='column__panel'
          expanded={this.state.isOpen}
          collapsible
        >
          {this.props.data.cards.map(card => {
            return <Card key={card.title} data={card} />
          })}
       </Panel>
      </div>
    );
  }
}

export default Column;
