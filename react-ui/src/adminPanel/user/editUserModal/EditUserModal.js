import React, { Component } from 'react';
import './EditUserModal.css';
import {Button, Modal, FormGroup, ControlLabel} from 'react-bootstrap';
import userDataService from '../../../data/userDataService';
import Validation from 'react-validation';

class EditUserModal extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      show: this.props.show,
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      id: this.props.id
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({show: nextProps.show})
  }

  close = () => {
    this.props.onHide();
  }

  changeName = (e) => {
    const name = e.target.value;
    this.setState({name: name});
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
    const user = {
      name: this.state.name,
      "email": this.state.email,
      "password": this.state.password
    };

    userDataService
    .updateUser(this.state.id, user);

    this.setState({
      name: '',
      email: '',
      password: ''
    })

    this.close();
  }

  render() {
    return (
      <Modal 
        className="add-user-modal"
        show={this.state.show}
        onHide={this.props.onHide}
      >
        <Modal.Header 
          closeButton
        > 
          <Modal.Title> Добавить пользователя </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Validation.components.Form>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Имя</ControlLabel>
                <Validation.components.Input
                  className='form-control'
                  name='name' 
                  type='text'
                  onChange={this.changeName}
                  value={this.state.name}
                  validations={['required']}
                />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Эл. почта</ControlLabel>
                <Validation.components.Input 
                  className='form-control'
                  name='email'
                  type='email'
                  onChange={this.changeEmail}
                  value={this.state.email}
                  validations={['required', 'email']}
                />
            </FormGroup>
           <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Пароль</ControlLabel>
                <Validation.components.Input
                  className='form-control'
                  name='password'
                  onChange={this.changePassword}
                  value={this.state.password}
                  validations={['required']}
                />
            </FormGroup>
            <Validation.components.Button
              className="btn btn-default"
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

export default EditUserModal;
