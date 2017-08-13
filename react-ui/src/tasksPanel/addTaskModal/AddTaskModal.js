import React, { Component } from 'react';
import './AddTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import taskDataService from '../../data/taskDataService';
import clientDataService from '../../data/clientDataService';
import DatePicker  from 'react-bootstrap-date-picker';


class AddTaskModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			user: userDataService.getCurrentUser(),
			show: this.props.show,
			users: [],
			executor: '',
			task: '',
			client: '',
			clients: this.props.clients,
			deadline: null,
			deadlineFormatted: null,
		}
		
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
		this.setState({
			client: nextProps.clients[0],
			clients: nextProps.clients
		});

	}

	componentDidMount() {
		userDataService
		.getUsers()
		.then((users) => {
			console.log(users)
			this.setState({
				users: users,
				executor: users[0].name,
				author: '',
				responsible: users[0].name,
				text: ''
			});
		});
	}


	close = () => {
		console.log('bbb')
		this.props.onHide();
	}

	handleChangeTextarea = (e) => {
		console.log(e)
		this.setState({text: e.target.value});
	}

	submit = () => {
		const task = {
			author: this.state.user.name,
			executor: this.state.executor,
			responsible: this.state.responsible,
			text: this.state.text,
			column: 'Задачи',
			client: this.state.client,
			date: new Date(),
			deadline: this.state.deadline,
		};

		console.log(task);

		taskDataService
		.addTask(task);

		this.setState({
			text: ''
		});

		this.close();
	}

	renderExecutorSelectOptions() {
		return this.state.users
		.map(user => <option key={user._id} value={user.name}>{user.name}</option>)
	}

	renderClientSelectOptions() {
		return this.state.clients
		.map(client => <option key={client._id} value={client._id}>{client.name}</option>)
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

	changeClientSelect = (e) => {
		const client = e.target.value;
		this.setState({client});
		console.log(client)
	}

	changeDate = (value, formattedValue) => {
		const [deadline, deadlineFormatted] = [value, formattedValue];
		this.setState({deadline, deadlineFormatted})
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
						<FormGroup>
							<ControlLabel>Клиент</ControlLabel>
							  <FormControl 
							  	componentClass="select" 
							  	defaultValue={this.state.client}
							  	onChange={this.changeClientSelect}
							  >
					        {this.renderClientSelectOptions()}
					      </FormControl>
						</FormGroup>
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
							<ControlLabel>Выполнить до</ControlLabel>
							  <DatePicker 
							  	value={this.state.deadline}
							  	onChange={this.changeDate}
							  	dayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
							  	monthLabels={['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь']}
							  />
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

export default AddTaskModal;
