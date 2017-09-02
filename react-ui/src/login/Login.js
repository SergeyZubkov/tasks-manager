import React, { Component } from 'react';
import './Login.css';
import {Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, Alert} from 'react-bootstrap';
import userDataService from '../data/userDataService';
import {Redirect} from 'react-router-dom';
import AuthService from '../AuthService';
import Validation from 'react-validation';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			redirect: false
		}
	}

	changePassword = (e) => {
		const password = e.target.value;
		this.setState({password: password});
	}

	changeEmail = (e) => {
		const email = e.target.value;
		this.setState({email: email});
	}

	submit = (e) => {
		e.preventDefault();
		const {email, password} = this.state;
		userDataService
		.login({email, password})
		.then((response) => {
			if (response.status !== 200) return;
			const token = response.data.token;
			AuthService.authenticateUser(token);
			this.setState({redirect: true});
		})
		.catch((err) => {
			if (err.response.status === 401) {
				this.setState({
					error: 'Неверный email или пароль'
				})			
			}
		});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={{
				pathname: '/',
				state: { from: this.props.location }
			}}/>
		}
		return (
			<div
				className='login'
			>
				<Grid>
					<Row>
						<Col md={6} mdOffset={3}>
							<Panel>
								<h2> Вход </h2>
								<Validation.components.Form>
									<FormGroup>
										<ControlLabel> Email </ControlLabel>
										<Validation.components.Input
											name='email'
											className='form-control'
											type='email'
											value={this.state.email}
											onChange={this.changeEmail}
											validations={['required', 'email']}
										/>
									</FormGroup>
									<FormGroup>
										<ControlLabel> Пароль </ControlLabel>
										<Validation.components.Input
											name='password'
											className='form-control'
											type='password'
											value={this.state.password}
											onChange={this.changePassword}
											validations={['required']}
										/>
									</FormGroup>
									{this.state.error&&
										<Alert
											bsStyle="danger"
										>
										 	{this.state.error}
										 </Alert>}
									<Button
										bsStyle="primary"
										onClick={this.submit}
									>
										Войти
									</Button>
								</Validation.components.Form>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Login;
