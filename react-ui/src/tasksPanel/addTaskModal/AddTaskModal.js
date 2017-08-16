import React, { Component } from 'react';
import './AddTaskModal.css';
import {Modal, FormGroup, ControlLabel} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import taskDataService from '../../data/taskDataService';
import clientDataService from '../../data/clientDataService';
import DatePicker  from 'react-bootstrap-date-picker';
import Validation from 'react-validation';
import moment from 'moment';

const TOMORROW = moment().add(1, 'day').toISOString()

class AddTaskModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			user: userDataService.getCurrentUser(),
			show: this.props.show,
			users: [],
			executor: '',
			text: '',
			client: '',
			clients: this.props.clients,
			deadline: TOMORROW
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
		this.setState({
			clients: nextProps.clients
		});

	}

	componentDidMount() {
		userDataService
		.getUsers()
		.then((users) => {
			this.setState({
				users: users,
				executor: users[0].name,
				author: '',
				responsible: users[0].name
			});
		});
	}


	close = () => {
		this.props.onHide();
	}

	changeTextarea = (e) => {
		this.setState({text: e.target.value});
	}

	submit = (e) => {
		e.preventDefault();

		const task = {
			author: this.state.user.name,
			executor: this.state.executor,
			responsible: this.state.responsible,
			text: this.state.text,
			column: 'Задачи',
			date: new Date(),
			deadline: this.state.deadline,
		};

		if (this.state.client) {
			task.client = this.state.client;
		}

		taskDataService
		.addTask(task);

		this.clearForm();

		this.close();
	}

	clearForm() {
		this.setState({
			client: '',
			text: '',
			clients: this.props.clients,
			deadline: TOMORROW
		})
	}

	renderExecutorSelectOptions() {
		return this.state.users
		.map(user => <option key={user._id} value={user.name}>{user.name}</option>)
	}

	renderClientSelectOptions() {
		let arr = this.state.clients
		.map(client => <option key={client._id} value={client._id}>{client.name}</option>);
		arr.push(<option key={'null'} value={''}>------</option>);
		return arr
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
					<Validation.components.Form
						
					>
						<FormGroup>
							<ControlLabel>Клиент</ControlLabel>
							  <Validation.components.Select 
							  	className='form-control'
									value={this.state.client}
									name='client'
									validations={[]}
									onChange={this.changeClientSelect}
							  >
					        {this.renderClientSelectOptions()}
					      </Validation.components.Select>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Исполнитель</ControlLabel>
							  <Validation.components.Select  
							  	name='executor'
							  	className='form-control'
							  	value={this.state.executor}
							  	validations={['required']}
							  	onChange={this.changeExecutorSelect}
							  >
					        {this.renderExecutorSelectOptions()}
					      </Validation.components.Select>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Ответственный</ControlLabel>
							  <Validation.components.Select
							  	name='responsible'  
							  	className='form-control' 
							  	value={this.state.responsible}
							  	validations={['required']}
							  	onChange={this.changeResponsibleSelect}
							  >
					        {this.renderResponsibleSelectOptions()}
					      </Validation.components.Select>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Выполнить до</ControlLabel>
							  <DatePicker 
							  	value={this.state.deadline}
							  	onChange={this.changeDate}
							  	minDate={TOMORROW}
							  	dayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
							  	monthLabels={['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь']}
							  />
						</FormGroup>
						<FormGroup>
				      <ControlLabel>Задача</ControlLabel>
				      <Validation.components.Textarea
								name='text'
								validations={['required']}
								className="form-control" 
								placeholder="..."
								value={this.state.text}
								onChange={this.changeTextarea}
				      />
				    </FormGroup>
						<Validation.components.Button
							className='btn btn-default'

							onClick={this.submit}
						>
							Добавить
						</Validation.components.Button>
					</Validation.components.Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default AddTaskModal;
