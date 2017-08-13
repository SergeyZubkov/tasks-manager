import React, { Component } from 'react';
import './EditTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import taskDataService from '../../data/taskDataService';
import clientDataService from '../../data/clientDataService';
import DatePicker from 'react-bootstrap-date-picker';

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
			client: this.props.client,
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

	renderClientSelectOptions() {
		return this.state.clients
		.map(client => <option key={client._id} value={client._id}>{client.name}</option>)
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
								onChange={this.changeTextarea}
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
