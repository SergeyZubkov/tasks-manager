import React, {Component} from 'react';
import './Comment.css';
import moment from 'moment';

class Comment extends Component {

	render() {
		return (
			<div
				className="comment"
			>
				<div
					className="comment__header"
				>
					{this.props.author}
				</div>
				<div
					className="comment__body"
				>
					{this.props.text}
				</div>
				<div
					className="comment__footer"
				>
					{moment(this.props.date).format('DD/MM/YY HH:mm')}
				</div>
			</div>
		)
	}
}


export default Comment;