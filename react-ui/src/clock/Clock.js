import React, { Component } from 'react';
import './Clock.css';

import Time from 'react-time';
import moment from 'moment';

class Clock extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      now: new Date()
    }
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({now: new Date()})
    }, 60000);
  }


  render() {
    const day = moment()
    .format('DD');
    const month = moment()
    .format('MM');
    const year = moment()
    .format('YY');

    return (
      <div
        className='clock'
      >
        <span
          className='clock-date'
        >
          {day}
          <i>/ </i>
          {month}
          <i>/ </i>
          {year}
        </span>
        <Time
          className="clock-time"
          value={this.state.now} 
          format="HH:mm"
        />
      </div>
    );
  }
}

export default Clock;
