import React, { Component } from 'react';
import './FilterModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import userDataService from '../../data/userDataService';
import clientDataService from '../../data/clientDataService';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import _ from 'lodash';

class FilterModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			show: this.props.show,
      //dataForFilterOptions
      clients: [],
      users: [],
      // selectFilterOptions
      client: undefined,
      author: undefined,
      executor: undefined,
      responsible: undefined,
      fromDate: undefined
		};

    this.getClients = this.getClients.bind(this);
    this.getUsers = this.getUsers.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(
			{show: nextProps.show}
		);
	}

	componentDidMount() {
    clientDataService.on('change', this.getClients);
    userDataService.on('change', this.getUsers);

    this.getClients();
		this.getUsers();
	}

  componentWillUnmount() {
    clientDataService.removeListener('change', this.getUsers);
    userDataService.removeListener('change', this.getClients);
  }

  getClients() {
    clientDataService
    .getAll()
    .then((clients) => {
      this.setState({
        clients: clients
      })
    });
  }

  getUsers() {
    userDataService
		.getUsers()
		.then((users) => {
      this.setState({
        users: users
      })
		});
  }

	close = () => {
		this.props.onHide();
	}

	submit = (e) => {
		e.preventDefault();

		const filterOpts =  _.pick(
      // убераем undefined и null
      _.pickBy(this.state, _.indentity),
      [
        "author",
        "executor",
        "responsible",
        "fromDate",
        "client"
      ]
    );

		this.props.onSelectFilterOpts(filterOpts);

		this.close();
	}


	renderClientSelectOptions() {
		let arr = this.state.clients
		.map(client => <option key={client._id} value={client._id}>{client.name}</option>);
		arr.unshift(<option key={'null'} value={null}></option>);
		return arr
	}

	renderPersonSelectOptions() {
		let arr =  this.state.users
		.map(user => <option key={user._id} value={user.name}>{user.name}</option>);
    arr.unshift(<option key={'null'} value={null}></option>);
    return arr
	}

  changeAuthorSelect = (e) => {
    const author = e.target.value;
    this.setState({author});
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

	changeDate = (value) => {
		this.setState({fromDate: value})
	}

	clearFilterOpts = () => {
		this.setState({
			client: undefined,
			author: undefined,
			executor: undefined,
			responsible: undefined,
			fromDate: undefined
		});

		this.props.onSelectFilterOpts({});

		this.close();
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
					<Modal.Title> Фильтровать по: </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Клиент</ControlLabel>
									<FormControl
								  	componentClass='select'
										value={this.state.client}
										name='client'
										onChange={this.changeClientSelect}
									>
									{this.renderClientSelectOptions()}
								</FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Исполнитель</ControlLabel>
							  <FormControl
							  	name='executor'
							  	componentClass='select'
							  	value={this.state.executor}
							  	onChange={this.changeExecutorSelect}
							  >
					        {this.renderPersonSelectOptions()}
					      </FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Ответственный</ControlLabel>
							  <FormControl
							  	name='responsible'
							  	componentClass='select'
							  	value={this.state.responsible}
							  	onChange={this.changeResponsibleSelect}
							  >
					        {this.renderPersonSelectOptions()}
					      </FormControl>
						</FormGroup>
            <FormGroup>
              <ControlLabel>Автор</ControlLabel>
              <FormControl
                componentClass="select"
                name='author'
                value={this.state.author}
                onChange={this.changeAuthorSelect}
              >
                {this.renderPersonSelectOptions()}
              </FormControl>
            </FormGroup>
						<FormGroup>
							<ControlLabel>Начиная с</ControlLabel>
								<DatePicker
									value={this.state.fromDate}
									onChange={this.changeDate}
									dayLabels={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
									monthLabels={['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь']}
								/>
						</FormGroup>
						<Button
							bsStyle='default'
							onClick={this.submit}
						>
							Пременить
						</Button>
						<Button
							className='pull-right'
							bsStyle='default'
							onClick={this.clearFilterOpts}
						>
							Сбросить
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default FilterModal;
