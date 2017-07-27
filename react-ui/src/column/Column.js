import React, { Component } from 'react';
import './Column.css';

import Card from '../card/Card';

class Column extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="column">
        <div className="column__header">
          <h3>{this.props.data.title} {this.props.data.cards.length}</h3>
        </div>
        {this.props.data.cards.map(card => {
          return <Card key={card.title} data={card} />
        })}
      </div>
    );
  }
}

export default Column;
