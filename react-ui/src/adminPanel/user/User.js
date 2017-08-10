import React, { Component } from 'react';
import './User.css';
import {Button, Col, Row} from 'react-bootstrap';

class User extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isEdit: false,
			name: this.props.name,
			email: this.props.email,
			password: this.props.password,
			id: this.props.id,
			newName: this.props.name,
			newEmail: this.props.email,
			newPassword: this.props.password
		}
	}

	delete = () => {
		this.props.onDelete(this.state.id);
	}

	editOn = () => {
		this.setState({
			isEdit: true
		});
	}

	changeName = (e) => {
		const name = e.target.value;
		this.setState({
			newName: name
		});
	}

	changeEmail = (e) => {
		const email = e.target.value;
		this.setState({
			newEmail: email
		});
	}

	changePassword = (e) => {
		const password = e.target.value;
		this.setState({
			newPassword: password
		});
	}

	saveChanges = () => {
		this.setState({
			isEdit: false
		});

		const newData = {
			name: this.state.newName,
			email: this.state.newEmail,
			password: this.state.mewPassword
		};

		const id = this.state.id;

		this.props.onUpdate(id, newData);
	}

	abortChanges = () => {
		this.setState({
			isEdit: false
		});
	}

	render() {
		const {
			name,
			email,
			password,
			newName,
			newEmail,
			newPassword
		} = this.state;
		return (
			<li className="user list-group-item clearfix">
				<Row 
					style={{
						display: `${this.state.isEdit ? 'none' : ''}`
					}}
				>
					<Col md={9} xs={6}>
						<div className="user-name">
							{name}
						</div>
						<div className="user-email">
							{email}
						</div>
						<div className="user-password">
							{password}
						</div>
					</Col>
					<Col md={3} xs={6} className='text-right'>
						<Button 
							bsStyle='default'
							onClick={this.editOn}
						>
							Редактировать
						</Button>
						<Button 
							bsStyle='danger'
							onClick={this.delete}
						>
							Удалить
						</Button>
					</Col>
				</Row>
				<Row 
					style={{
						display: `${!this.state.isEdit ? 'none' : ''}`
					}}
				>
					<Col md={9} xs={6}>
						<input 
							className="user-name"
							type='text'
							value={newName}
							onChange={this.changeName}
						/>
						<input 
							className="user-email"
							type='email'
							value={newEmail}
							onChange={this.changeEmail}
						/>
						<input 
							className="user-password"
							type='text'
							value={newPassword}
							onChange={this.changePassword}
						/>
					</Col>
					<Col md={3} xs={6} className='text-right'>
						<Button 
							bsStyle='success'
							onClick={this.saveChanges}
						>
							Принять
						</Button>
						<Button 
							bsStyle='danger'
							onClick={this.abortChanges}
						>
							Отменить
						</Button>
					</Col>
				</Row>
			</li>
		);
	}
}

export default User;
