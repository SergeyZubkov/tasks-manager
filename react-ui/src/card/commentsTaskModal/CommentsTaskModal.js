import React, { Component } from 'react';
import './CommentsTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import taskDataService from '../../data/taskDataService';
import userDataService from '../../data/userDataService';
import Card from '../Card';
import Comment from './comment/Comment';

class CommentsTaskModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			show: false,
			text: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
	}

	close = () => {
		this.props.onHide();
	}

	submit = () => {
		const comment = {
			author: userDataService.getCurrentUser().name,
			text: this.state.text,
			date: new Date()
		};

		const taskId = this.props._id;
		taskDataService
		.addComment(taskId, comment);
		
		this.setState({text: ''})
	}

	handleChangeTextarea = (e) => {
		const text = e.target.value;
		this.setState({text});
	}

	exit = () => {
		this.setState({text: ''});
		this.close();
	}

	render() {
		const {
			comments,
			client
		} = this.props;

		return (
			<Modal 
				className="comments-task-modal"
				show={this.state.show}
				onHide={this.props.onHide}
			>
				<Modal.Header 
					closeButton
				> 
					<Modal.Title> 
						Коментарии
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					{comments.map(com => <Comment key={com._id} {...com} />)}
					<form>
						<FormGroup>
							 <ControlLabel>Ваш коментарий</ControlLabel>
					      <FormControl 
					      	componentClass="textarea" 
					      	placeholder="..."
					      	onChange={this.handleChangeTextarea}
					      	value={this.state.text}
					      />
						</FormGroup>
						<Button
							onClick={this.submit}
						>
							Отправить
						</Button>
						<Button
							bsStyle='danger'
							onClick={this.exit}
						>
							Закрыть
						</Button>
					</form>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default CommentsTaskModal;
