import React, { Component } from 'react';
import './AddUserModal.css';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import userDataService from '../../data/userDataService';

class AddUserModal extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      show: this.props.show,
      name: '',
      email: '',
      password: ''
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

  submit = () => {
    const user = {
      name: this.state.name,
      "email": this.state.email,
      "password": this.state.password
    };

    userDataService
    .addUser(user);

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
          <form>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Имя</ControlLabel>
                <FormControl 
                  type='text'
                  onChange={this.changeName}
                  value={this.state.name}
                />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Эл. почта</ControlLabel>
                <FormControl 
                  type='email'
                  onChange={this.changeEmail}
                  value={this.state.email}
                />
            </FormGroup>
           <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Пароль</ControlLabel>
                <FormControl 
                  type='text'
                  onChange={this.changePassword}
                  value={this.state.password}
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

export default AddUserModal;
