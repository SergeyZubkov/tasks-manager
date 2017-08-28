import React, {Component} from 'react';
import './DeadlineProgress.css';
import {ProgressBar} from 'react-bootstrap';

class DeadlineProgress extends Component {

	render() {
		const {
			fromDate,
			toDate
		} = this.props;

		const timeLimit = Math.abs(toDate - fromDate);
		const timeLeft = new Date() - fromDate;
		const per = Math.round(timeLeft / ( timeLimit / 100 ));
		return (
			<ProgressBar className={this.props.show ? '': 'hidden'} now={per} /> 
		)
	}
}

export default DeadlineProgress;