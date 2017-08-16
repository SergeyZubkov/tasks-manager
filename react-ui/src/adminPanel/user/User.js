import React, { Component } from 'react';
import './User.css';
import {Button, Col, Row} from 'react-bootstrap';
import EditUserModal from './editUserModal/EditUserModal';

class User extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			showEditUserModal: false,
			name: this.props.name,
			email: this.props.email,
			password: this.props.password,
			id: this.props.id
		}
		console.log(this.state.id)
	}

	delete = () => {
		this.props.onDelete(this.state.id);
	}

	editOn = () => {
		this.setState({
			showEditUserModal: true
		});
	}

	closeEditUserModal = () => {
		this.setState({
			showEditUserModal: false
		})
	}

	render() {
		const {
			id,
			name,
			email,
			password,
			showEditUserModal
		} = this.state;

		return (
			<li className="user list-group-item clearfix">
				<Row>
					<Col md={9} xs={6}>
						<div className="user-group">
							<div className="user-group__label">Имя: </div>
							<div className="user-group__value">{name}</div>
						</div>
						<div className="user-group">
							<div className="user-group__label">Эл. почта: </div>
							<div className="user-group__value">{email}</div>
						</div>
						<div className="user-group">
							<div className="user-group__label">Пароль: </div>
							<div className="user-group__value">{password}</div>
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
				<EditUserModal
					show={showEditUserModal}
					onHide={this.closeEditUserModal}
					name={name}
					email={email}
					password={password}
					id={id}
				/>
			</li>
		);
	}
}

export default User;
