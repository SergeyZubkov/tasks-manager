import React, { Component } from 'react';
import './ClientItem.css';
import {Button, Panel, ListGroupItem} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import clientDataService from '../../../data/clientDataService';
import ClientInfoModal from '../../clientInfoModal/ClientInfoModal';

class ClientItem extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			showClienInfoModal: false
		}
	}

	openClientInfo = (e) => {
		console.log()
		this.setState({
			showClienInfoModal: true
		});
	}

	closeClientInfoModal = () => {
		this.setState({
			showClienInfoModal: false
		});
	}

	remove = (e) => {
		clientDataService.remove(this.props._id);
		e.stopPropagation();
	}

	edit = (e) => {
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
					onClick={this.edit}
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

			</li>
		);
	}
}

export default ClientItem;
