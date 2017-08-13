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
		console.log('time limit - ' + timeLimit);
		const timeLeft = new Date() - fromDate;
		console.log('time left - ' + timeLeft);
		const per = Math.round(timeLeft / ( timeLimit / 100 ));
		console.log(per);
		return(
			<ProgressBar now={per} />
		)
	}
}

export default DeadlineProgress;