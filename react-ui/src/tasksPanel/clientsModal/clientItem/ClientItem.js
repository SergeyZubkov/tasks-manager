import React, { Component } from 'react';
import './ClientItem.css';
import {Button, Panel, ListGroupItem} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import clientDataService from '../../../data/clientDataService';
import ClientInfoModal from '../../clientInfoModal/ClientInfoModal';
import EditClientModal from './editClientModal/EditClientModal';

class ClientItem extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showClienInfoModal: false,
			showEditClientModal: false
		}
	}

	openEditClient = (e) => {

		this.setState({
			showEditClientModal: true
		});

				e.stopPropagation();
	}

	openClientInfo = () => {
		this.setState({
			showClienInfoModal: true
		});
	}

	closeClientInfoModal = () => {
		this.setState({
			showClienInfoModal: false
		});
	}

	closeEditClientModal = () => {
		this.setState({
			showEditClientModal: false
		});
	}

	remove = (e) => {
		let conf = window.confirm('Вы уверенны, что хотите удалить клиента?');
		if (conf) {
			clientDataService.remove(this.props._id);
		}
		e.stopPropagation();
	}

	render() {
		const {
			name
		} = this.props;

		const {
			clients
		} = this.props;

		return (
			<li
				className="client-item list-group-item"
				onClick={this.openClientInfo}
			>
				{name}
				<Button
					onClick={this.openEditClient}
				>
					<FontAwesome
						name='edit'
					/>
				</Button>
				<Button
					bsStyle="danger"
					onClick={this.remove}
				>
					<FontAwesome
						name='trash'
					/>
				</Button>
				<ClientInfoModal
				 	show={this.state.showClienInfoModal}
	        onHide={this.closeClientInfoModal}
					{...this.props}
				/>
				<EditClientModal
				 	show={this.state.showEditClientModal}
	        onHide={this.closeEditClientModal}
					{...this.props}
				/>
			</li>
		)
	}
}

export default ClientItem;
