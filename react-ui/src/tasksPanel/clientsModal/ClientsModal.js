import React, { Component } from 'react';
import './ClientsModal.css';
import {Modal, ListGroup} from 'react-bootstrap';
import ClientItem from './clientItem/ClientItem';


class ClientsModal extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			show: this.props.show
		}
		
		console.log('clients mounted ');
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
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
					<Modal.Title> Клиенты ({clients.length}) </Modal.Title>
				</Modal.Header>
				<ListGroup>
					{clients.map(client => <ClientItem key={client._id} {...client} />)}
				</ListGroup>
			</Modal>
		);
	}
}

export default ClientsModal;
