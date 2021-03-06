import React, { Component } from 'react';
import './ClientInfoModal.css';

import {Modal} from 'react-bootstrap';
import Linkify from 'react-linkify';
import {connect} from 'react-redux';


class ClientInfoModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			show: this.props.show
		}

	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
	}

	close = () => {
		this.props.onHide();
	}

	render() {

		const {
			name,
			phone,
			additionalInfo
		} = this.props.clientInfo;

		return (
			<Modal
				className="clients-modal"
				show={this.state.show}
				onHide={this.props.onHide}
			>
				<Modal.Header
					closeButton
				>
					<Modal.Title> {name} </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4> Телефон </h4>
					<div>
						<a
							href={`tel:${phone}`}
						>
							{phone}
						</a>
					</div>
					<h4> Дополнительная информация </h4>
					<p>
						<Linkify>
							{additionalInfo}
						</Linkify>
					</p>
				</Modal.Body>
		</Modal>
		);
	}
}

export default connect(state => ({
	clientInfo: state.entities.clients.info
}))(ClientInfoModal);
