import React, { Component } from 'react';
import './AddTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import dataService from '../dataService';

class AddTaskModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			show: this.props.show,
			executors: [],
			task: null,
			executor: null
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show})
	}

	componentDidMount() {
		dataService
		.getUsers()
		.then((users) => {
			console.log(users)
			this.setState({
				executors: users,
				executur: users[0]
			});
		});
	}

	getValidationState() {
		const task = this.state.task;
		if (task === null) return null
		const length = task.length;
    if (length < 3) {
    	return 'error';
    } else {
    	return 'success';
    }
	}

	close = () => {
		this.props.onHide();
	}

	handleChangeTextarea = (e) => {
		console.log(e)
		this.setState({task: e.target.value});
	}

	submit = () => {
		const task = {
			author: 'kostay',
			"executor": this.state.executor,
			"task": this.state.task,
			"dateCreate": new Date(),
			"comments": []
		};

		dataService
		.addTask(JSON.serialize(task));
	}

	renderExecutorSelectOptions() {
		return this.state.executors
		.map(user => <option key={user} value={user}>{user}</option>)
	}

	render() {
		return (
			<Modal 
				className="add-task-modal"
				show={this.state.show}
				onHide={this.props.onHide}
			>
				<Modal.Header 
					closeButton
				> 
					<Modal.Title> Добавить задачу </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup
							controlId="formBasicText"
						>
							<ControlLabel>Исполнитель</ControlLabel>
							  <FormControl 
							  	componentClass="select" 
							  	defaultValue={this.state.executor}
							  >
					        {this.renderExecutorSelectOptions()}
					      </FormControl>
						</FormGroup>
						<FormGroup 
							controlId="formControlsTextarea"
							validationState={this.getValidationState()}
						>
				      <ControlLabel>Задача</ControlLabel>
				      <FormControl 
				      	componentClass="textarea" 
				      	placeholder="textarea"
				      	onChange={this.handleChangeTextarea} 
				      />
				    </FormGroup>
						<Button
						onClick={this.submit}
						>
							Добавить
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default AddTaskModal;
