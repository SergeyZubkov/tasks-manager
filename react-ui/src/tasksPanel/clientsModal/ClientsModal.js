import React, { Component } from 'react';
import {Modal, ListGroup, Button, } from 'react-bootstrap';
import {connect} from 'react-redux';

import './ClientsModal.css';
import ClientItem from './clientItem/ClientItem';
import ClientInfo from '../clientInfoModal/ClientInfoModal';
import {ClientEditForm, ClientAddForm} from './clientForm/ClientForm';
import FontAwesome from 'react-fontawesome';
import AddClientModal from './addClientModal/AddClientModal';
import {
	showClientInfo,
	fetchClients,
	setEditingClient,
	unsetEditingClient,
	updateClient,
	deleteClient,
	addClient
} from '../../data/clients/actions';
import {getClients} from '../../data/clients/reducer';

class ClientsModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			showClientAddForm: false
		}
		
	}

	componentDidMount() {
		this.props.getClients()
	}

	showClientForm = () => {
    this.setState({showClientAddForm: true});
  }

	closeClientAddForm = () => {
    this.setState({showClientAddForm: false});
  }

  showClientInfo = (client) => (e) => {
  	this.setState({showClientInfo: true})
  	this.props.showClientInfo(client)
  }

  deleteClient = (client) => (e) => {
  	e.stopPropagation();
  	this.props.deleteClient(client._id)
  }

  closeClientInfo = () => {
  	this.setState({showClientInfo: false})
  }

  showClientEditForm = (client) => (e) => {
  	e.stopPropagation();
  	this.setState({showClientEditForm: true})
  	this.props.setEditingClient(client)
  }

  closeClientEditForm = () => {
  	this.props.unsetEditingClient();
  	this.setState({showClientEditForm: false})
  }

	close = () => {
		this.props.onHide();
	}

	addClient = (client) => {
		this.closeClientAddForm();
		this.props.addClient(client)
	}

	updateClient = (updatedClient) => {
		this.closeClientEditForm();
		this.props.updateClient(updatedClient);
	}

	renderClientItem = (client) => {
		console.log('renderItem')
		return (
			<ClientItem key={client._id} title={client.name} onClick={this.showClientInfo(client)}>
				<Button 
					bsStyle='default'
					onClick={this.showClientEditForm(client)}
				>
					<FontAwesome
						name='edit'
					/>
				</Button>
				<Button 
					bsStyle='danger'
					onClick={this.deleteClient(client)}
				>
					<FontAwesome
						name='trash'
					/>
				</Button>
			</ClientItem>
		)
	}

	render() {
		const {clients} = this.props
		return (
			<Modal 
				className="clients-modal"
				show={this.props.show}
				onHide={this.props.onHide}
			>
				<Modal.Header 
					closeButton
				> 
					<Modal.Title> Клиенты ({clients&&clients.length||0}) 
						  <Button 
                bsStyle='success'
                onClick={this.showClientForm}
              > 
	              <FontAwesome name='plus-square-o' />
	              <div className="hidden-xs">&nbsp;Добавить клиента</div>
              </Button>
					</Modal.Title>
				</Modal.Header>
				<ListGroup>
					{clients.map(this.renderClientItem)}
				</ListGroup>

				<ClientAddForm
          show={this.state.showClientAddForm}
          onHide={this.closeClientAddForm}
          onSubmit={this.addClient}
        />
        <ClientEditForm
        	show={this.state.showClientEditForm}
        	onHide={this.closeClientEditForm}
        	onSubmit={this.updateClient}
        />
				<ClientInfo
					show={this.state.showClientInfo}
					onHide={this.closeClientInfo}
				/>
			</Modal>
		);
	}
}

export default connect(state => ({clients: getClients(state)}), 
	{
		getClients: fetchClients,
		showClientInfo,
		setEditingClient,
		unsetEditingClient,
		updateClient,
		deleteClient,
		addClient
	})(ClientsModal);
