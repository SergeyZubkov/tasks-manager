import React, { Component } from 'react';
import './AdminPanel.css';
import AddUserModal from './addUserModal/AddUserModal';
import User from './user/User';
import {Button,Grid, Row} from 'react-bootstrap';
import userDataService from '../data/userDataService';

class AdminPanel extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			addUserModalShow: false,
			users: []
		}

		this.fetch = this.fetch.bind(this);
	}

	componentDidMount() {
		userDataService.on('change', this.fetch);
		
		this.fetch();
	}

	componentWillUnmount() {
		userDataService.removeListener('change', this.fetch);
	}

	fetch() {
		userDataService
		.getUsers()
		.then((data) => {
			this.setState({
				users: []
			});
			this.setState({
				users: data
			});
		});
	} 

	addUser = () => {
		this.setState({
			addUserModalShow: true
		});
	}

	deleteUser = (id) => {
		userDataService
		.deleteUser(id);
	}

	updateUser = (id, data) => {
		userDataService
		.updateUser(id, data);
	}

	closeAddUserModal = () => {
		this.setState({
			addUserModalShow: false
		});
	}

	render() {
		return (
			<Grid className="admin-panel">
				<Row>
					<div className="admin-panel__app-link"><a href="/"> Task Manager </a></div>
					<h2>Панель администратора</h2>
					<hr></hr>
					<h3>Пользователи: 
						<Button 
							className='pull-right' 
							bsStyle='success'
							onClick={this.addUser}
						> 
							Добавить 
						</Button>
					</h3>
					<ul className="list-group">
						{this.state.users.map(user => {
							return (
								<User
									key={user._id}
									_id={user._id}
									name={user.name}
									password={user.password}
									email={user.email}
									onDelete={this.deleteUser}
									onUpdate={this.updateUser}
								/>
							)
						})}
					</ul>
				</Row>
				<AddUserModal
					show={this.state.addUserModalShow}
					onHide={this.closeAddUserModal}
				/>
			</Grid>
		);
	}
}

export default AdminPanel;
