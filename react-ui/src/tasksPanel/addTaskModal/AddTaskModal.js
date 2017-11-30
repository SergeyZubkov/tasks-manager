import React, { Component } from 'react';
import './AddTaskModal.css';
import {Modal, FormGroup, ControlLabel, Checkbox} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import taskDataService from '../../data/taskDataService';
import DatePicker  from 'react-bootstrap-date-picker';
import Validation from 'react-validation';
import moment from 'moment';
import {connect} from 'react-redux';

const TOMORROW = moment().add(1, 'day').toISOString()

class AddTaskModal extends Component {

	constructor(props) {
		super(props);

		const currentUser = userDataService.getCurrentUser();

		this.state = {
			user: currentUser,
			show: this.props.show,
			users: [],
			executor: currentUser._id,
			responsible: currentUser._id,
			text: '',
			client: '',
			clients: this.props.clients,
			deadline: null,
			disabledPriorityInput: true,
			disabledDeadlineInput: true,
			priority: 0,
			deadline: null
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
			author: this.state.user._id,
			executor: this.state.executor,
			responsible: this.state.responsible,
			text: this.state.text,
			column: 'Задачи',
			deadline: this.state.disabledDeadlineInput ? null : this.state.deadline,
			priority: this.state.priority,
			date: new Date()
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
			deadline: null,
			disabledPriorityInput: true,
			disabledDeadlienInput: true,
			priority: 0
		})
	}

	renderExecutorSelectOptions() {
		return this.state.users
		.map(user => <option key={user._id} value={user._id}>{user.name}</option>)
	}

	renderClientSelectOptions() {
		// let arr = this.state.clients
		// .map(
		// 	client =>(
		// 		<option key={client._id} value={client._id}>{client.name}</option>
		// 	)
		// );
		// arr.push(<option key={'null'} value={''}>------</option>);
		// return 
		return []
	}

	renderResponsibleSelectOptions() {
		return this.state.users
		.map(user => <option key={user._id} value={user._id}>{user.name}</option>)
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

	changePriority = (e) => {
		// react-validation input type number - происходит измениния типа данных
		// после изменения значения с Number на String
		const priority = +e.target.value;
		console.log(typeof priority)
		this.setState({priority});
	}

	changeAvailabilityDeadlineInput = () => {
		let disabledDeadlineInput = !this.state.disabledDeadlineInput;

		if (disabledDeadlineInput) {
			this.setState({deadline: null})
		} else {
			this.setState({deadline: TOMORROW});
		}

		this.setState({disabledDeadlineInput});
	}

	changeAvailabilityPriorityInput = () => {
		let disabledPriorityInput = !this.state.disabledPriorityInput;

		if (disabledPriorityInput) {
			this.setState({priority: 0})
		} else {
			this.setDefaultPriorityValue();
		}

		this.setState({disabledPriorityInput});
	}

	setDefaultPriorityValue() {
		const tasksExecutor = taskDataService
		.getAllTasksForExecutor(this.state.executor);

		let defaultPriority = Math.max(...tasksExecutor
			.map(t => t.priority||0)
		) + 1;

		this.setState({priority: defaultPriority})
		console.log(this.state.priority);
	}

	render() {
		console.log(TOMORROW.slice(0, 10))

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
								<Checkbox onChange={this.changeAvailabilityDeadlineInput}>
									Установить срок
								</Checkbox>
							  <DatePicker
							  	value={this.state.deadline||TOMORROW}
							  	onChange={this.changeDate}
							  	minDate={TOMORROW}
							  	dayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
							  	monthLabels={['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь']}
									disabled={this.state.disabledDeadlineInput}
							  />
						</FormGroup>
						<FormGroup>
							<ControlLabel>Приоритет</ControlLabel>
								<Checkbox onChange={this.changeAvailabilityPriorityInput}>
									Установить приоритет
								</Checkbox>
							  <Validation.components.Input
							  	type='number'
							  	name='priority'
							  	validations={[]}
							  	className='form-control'
							  	value={this.state.priority}
							  	onChange={this.changePriority}
							  	disabled={this.state.disabledPriorityInput}
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

export default connect(state => ({}))(AddTaskModal);
