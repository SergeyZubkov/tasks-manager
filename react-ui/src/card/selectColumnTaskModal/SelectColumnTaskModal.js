import React, { Component } from 'react';
import './SelectColumnTaskModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import taskDataService from '../../data/taskDataService';

class SelectColumnTaskModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			_id: this.props.id,
			column: this.props.column,
			columns: [
        "Задачи",
        "Выполняются",
        "Завершенные",
        "Замороженные"
      ]
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

	submit = () => {
		const task = {
			column: this.state.column,
		};
		const id = this.state._id;
		taskDataService
		.update(id, task);
		
		this.close();
	}

	renderColumnSelectOptions() {
		return this.state.columns
		.map(column => <option key={column} value={column}>{column}</option>)
	}

	changeColumnSelect = (e) => {
		const column = e.target.value;
		this.setState({column});
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
					<Modal.Title> Переместить задачу </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Колонка</ControlLabel>
							  <FormControl 
							  	componentClass="select" 
							  	defaultValue={this.state.column}
							  	onChange={this.changeColumnSelect}
							  >
					        {this.renderColumnSelectOptions()}
					      </FormControl>
						</FormGroup>
						<Button
							onClick={this.submit}
						>
							Переместить
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default SelectColumnTaskModal;
