import React, { Component } from 'react';
import './EditUserModal.css';
import {Button, Modal, FormGroup, ControlLabel} from 'react-bootstrap';
import userDataService from '../../../data/userDataService';
import Validation from 'react-validation';

class EditUserModal extends Component {

  constructor(props) {
    super(props);

    const {
      show,
      name,
      email,
      password,
      _id
    } = this.props;
    console.log(this.props)

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    this.state = {
      show,
      firstName,
      lastName,
      email,
      password,
      _id
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({show: nextProps.show})
  }

  close = () => {
    this.props.onHide();
  }

  handleChange = (e) => {
    const {name, value} = e.target;

    this.setState({[name]: value});
  }

  submit = (e) => {
    e.preventDefault();

    const {
      firstName, 
      lastName,
      email,
      password,
      _id
    } = this.state;

    const user = {
      name: `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`,
      email,
      password
    };

    userDataService
    .updateUser(_id, user);

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
                  name='firstName' 
                  type='text'
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  validations={['required']}
                />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Фамилия</ControlLabel>
                <Validation.components.Input
                  className='form-control'
                  name='lastName' 
                  type='text'
                  onChange={this.handleChange}
                  value={this.state.lastName}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
