import React, { Component } from 'react';
import './EditTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import taskDataService from '../../data/taskDataService';

class EditTaskModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			show: this.props.show,
			users: [],
			_id: this.props._id,
			author: this.props.author,
			executor: this.props.executor,
			text: this.props.text,
			responsible: this.props.responsible
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
	}

	componentDidMount() {
		userDataService
		.getUsers()
		.then((users) => {
			console.log(users)
			this.setState({
				users: users
			});
		});
	}

	close = () => {
		this.props.onHide();
	}

	handleChangeTextarea = (e) => {
		console.log(e)
		this.setState({text: e.target.value});
	}

	submit = () => {
		const task = {
			author: this.state.author,
			executor: this.state.executor,
			responsible: this.state.responsible,
			text: this.state.text 
		};
		const id = this.state._id;
		taskDataService
		.update(id, task);
		
		this.close();
	}

	renderExecutorSelectOptions() {
		return this.state.users
		.map(user => <option key={user._id} value={user.name}>{user.name}</option>)
	}

	renderResponsibleSelectOptions() {
		return this.state.users
		.map(user => <option key={user._id} value={user.name}>{user.name}</option>)
	}

	changeExecutorSelect = (e) => {
		const executor = e.target.value;
		this.setState({executor});
	}

	changeResponsibleSelect = (e) => {
		const responsible = e.target.value;
		this.setState({responsible});
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
					<Modal.Title> Изменить задачу </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Исполнитель</ControlLabel>
							  <FormControl 
							  	componentClass="select" 
							  	defaultValue={this.state.executor}
							  	onChange={this.changeExecutorSelect}
							  >
					        {this.renderExecutorSelectOptions()}
					      </FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Проверяющий</ControlLabel>
							  <FormControl 
							  	componentClass="select" 
							  	defaultValue={this.state.responsible}
							  	onChange={this.changeResponsibleSelect}
							  >
					        {this.renderResponsibleSelectOptions()}
					      </FormControl>
						</FormGroup>
						<FormGroup>
				      <ControlLabel>Задача</ControlLabel>
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
							Добавить
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default EditTaskModal;
