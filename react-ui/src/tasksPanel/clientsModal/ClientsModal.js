import React, { Component } from 'react';
import './ClientsModal.css';
import {Modal, ListGroup, Button, } from 'react-bootstrap';
import ClientItem from './clientItem/ClientItem';
import FontAwesome from 'react-fontawesome';
import AddClientModal from './addClientModal/AddClientModal';


class ClientsModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			show: this.props.show,
			showAddClientModal: false,
		}
		
		console.log('clients mounted ');
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
	}

	addClient= () => {
    this.setState({showAddClientModal: true});
  }

	closeAddClientModal = () => {
    this.setState({showAddClientModal: false});
  }

	close = () => {
		this.props.onHide();
	}

	render() {

		const {
			clients
		} = this.props;

		return (
			<Modal 
				className="clients-modal"
				show={this.state.show}
				onHide={this.props.onHide}
			>
				<Modal.Header 
					closeButton
				> 
					<Modal.Title> Клиенты ({clients.length}) 
						  <Button 
                bsStyle='success'
                onClick={this.addClient}
              > 
	              <FontAwesome name='plus-square-o' />
	              <div className="hidden-xs">&nbsp;Добавить клиента</div>
              </Button>
					</Modal.Title>
				</Modal.Header>
				<ListGroup>
					{clients.map(client => <ClientItem key={client._id} {...client} />)}
				</ListGroup>
				<AddClientModal
          show={this.state.showAddClientModal}
          onHide={this.closeAddClientModal}
        />
			</Modal>
		);
	}
}

export default ClientsModal;
