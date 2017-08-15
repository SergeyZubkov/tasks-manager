import React, { Component } from 'react';
import './EditTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
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
			clients: [],
			users: [],
			_id: this.props._id,
			date: this.props.date,
			author: this.props.author,
			executor: this.props.executor,
			responsible: this.props.responsible,
			text: this.props.text,
			client: this.props.client||'',
			deadline: this.props.deadline
		}
		
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
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

	submit = (e) => {
		e.preventDefault();
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
						<FormGroup>
							<ControlLabel>Задача</ControlLabel>
				      <Validation.components.Textarea  
				      	name='text'
				      	validations={['required']}
				      	className='form-control'
				      	placeholder="..."
				      	onChange={this.handleChangeTextarea}
				      	value={this.state.text}
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

export default EditTaskModal;
