import React, { Component } from 'react';
import './Login.css';
import {Grid, Row, Col, Panel, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import userDataService from '../data/userDataService';
import {Redirect} from 'react-router-dom';
import AuthService from '../AuthService';

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

	submit = () => {
		const {email, password} = this.state;
		userDataService
		.login({email, password})
		.then((response) => {
			if (response.status !== 200) return;
			const token = response.data.token;
			AuthService.authenticateUser(token);
			this.setState({redirect: true});
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
								<form>
									<FormGroup>
										<ControlLabel> Email </ControlLabel>
										<FormControl
											type='email'
											value={this.state.email}
											onChange={this.changeEmail}
										/>
									</FormGroup>
									<FormGroup>
										<ControlLabel> Пароль </ControlLabel>
										<FormControl
											type='password'
											value={this.state.password}
											onChange={this.changePassword}
										/>
									</FormGroup>
									<Button 
										bsStyle="primary"
										onClick={this.submit}
									>
										Войти
									</Button>
								</form>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default Login;

