import React, { Component } from 'react';
import './EditTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import taskDataService from '../../data/taskDataService';
import clientDataService from '../../data/clientDataService';
import DatePicker from 'react-bootstrap-date-picker';
import Validation from 'react-validation';
import moment from 'moment';

const TOMORROW = moment().add(1, 'day').toISOString();

class EditTaskModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			show: this.props.show,
			disabledPriorityInput: this.props.priority ? false : true,
			column: this.props.column,
			clients: [],
			users: [],
			_id: this.props._id,
			date: this.props.date,
			author: this.props.author,
			executor: this.props.executor,
			responsible: this.props.responsible,
			text: this.props.text,
			client: this.props.client||'',
			deadline: this.props.deadline,
			priority: this.props.priority,
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState(
			{
				show: nextProps.show, 
				disabledPriorityInput: nextProps.priority ? false : true,
				...nextProps
			}
		);
	}

	componentDidMount() {
		userDataService
		.getUsers()	
		.then((users) => {
			this.setState({
				users: users
			});
		});
		this.getClients();

		clientDataService.on('change', this.getClients);
	}

	getClients = () => {
		clientDataService 
		.getAll()
		.then((clients) => {
			this.setState({
				clients: clients
			})
		});
	}

	close = () => {

		this.props.onHide();
	}

	resetForm = () => {
		this.setState({
			disabledPriorityInput: this.props.priority ? false : true,
			_id: this.props._id,
			author: this.props.author,
			executor: this.props.executor,
			responsible: this.props.responsible,
			text: this.props.text,
			client: this.props.client||'',
			deadline: this.props.deadline,
			priority: this.props.priority
		})
	}

	submit = (e) => {
		e.preventDefault();
		const editedTask = {
			_id: this.props._id,
			author: this.state.author,
			executor: this.state.executor,
			responsible: this.state.responsible,
			text: this.state.text,
			deadline: this.state.deadline ,
			priority: this.state.priority
		};

		if (this.state.client) {
			editedTask.client = this.state.client;
		} else {
			editedTask.client = undefined;
		}

		const id = this.state._id;
		taskDataService
		.update(id, editedTask, this.state.originalTask);

		this.close();
	}

	renderClientSelectOptions() {
		let arr = this.state.clients
		.map(client => <option key={client._id} value={client._id}>{client.name}</option>);
		arr.push(<option key={'null'} value={''}>------</option>);
		return arr
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

	changeTextarea = (e) => {
		this.setState({text: e.target.value});
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
		const priority = e.target.value;
		this.setState({priority});
	}

	changeAvailabilityPriorityInput = () => {
		let disabledPriorityInput = !this.state.disabledPriorityInput;

		if (disabledPriorityInput) {
			this.setState({priority: 0})
		} else {
			if (this.props.priority) {
				this.setState({priority: this.props.priority})
			} else {				
				this.setDefaultPriorityValue();
			}
		}

		this.setState({disabledPriorityInput});
	}

	setDefaultPriorityValue() {
		const tasksExecutor = taskDataService.getAllTasksForExecutor(this.state.executor);

		let defaultPriority = Math.max(...tasksExecutor
			.map(t => t.priority||0)
		) + 1;

		this.setState({priority: defaultPriority})
		console.log(this.state.priority);
	}

	render() {
		return (
			<Modal 
				className="add-task-modal"
				show={this.state.show}
				onHide={this.props.onHide}
				onExited={this.resetForm}
			>
				<Modal.Header 
					closeButton
				> 
					<Modal.Title> Изменить задачу </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Validation.components.Form>
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
									minDate={TOMORROW}
									onChange={this.changeDate}
									dayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
									monthLabels={['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь']}
								/>
						</FormGroup>
						<FormGroup
						 	style={{
                display: this.state.column === 'Завершенные' || this.state.column === 'Замороженные'
                ? 'none' : ''
              }}
						>
							<ControlLabel>Приоритет</ControlLabel>
								{this.props.priority ? 
									<Checkbox
										onChange={this.changeAvailabilityPriorityInput}
									>
										Убрать приоритет
									</Checkbox> :
									<Checkbox
										onChange={this.changeAvailabilityPriorityInput}
									>
										Установить приоритет
									</Checkbox>
								}
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
				      	className='form-control'
				      	placeholder="..."
				      	onChange={this.changeTextarea}
				      	value={this.state.text}
				      />
				    </FormGroup>
						<Validation.components.Button
							className='btn btn-default'
							onClick={this.submit}
						>
							Изменить
						</Validation.components.Button>
					</Validation.components.Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default EditTaskModal;
