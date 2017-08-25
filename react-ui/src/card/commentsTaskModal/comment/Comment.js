import React, {Component} from 'react';
import './Comment.css';
import moment from 'moment';
import Linkify from 'react-linkify';

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
					<Linkify>
						{this.props.text}
					</Linkify>
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