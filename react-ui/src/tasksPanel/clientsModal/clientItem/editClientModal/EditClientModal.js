import React, {Component} from 'react';
import './EditClientModal.css';
import clientDataService from '../../../../data/clientDataService';
import ReactTelInput from 'react-telephone-input';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import flagsCountriesSrc from '../../../../flags.png';

class EditClientModal extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			show: this.props.show,
			name: this.props.name||'',
			phone: this.props.phone||'',
			additionalInfo: this.props.additionalInfo||''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({show: nextProps.show});
	}

	close = () => {
		this.props.onHide();
	}


	submit = () => {
		clientDataService
		.update(this.props._id, {
			name: this.state.name,
			phone: this.state.phone,
			additionalInfo: this.state.additionalInfo
		});

		this.close();
	}

	changeName = (e) => {
		const name = e.target.value;
		this.setState({name});
	}

	changePhone = (phone) => {
		this.setState({phone});
	}

	changeTextarea = (e) => {
		const additionalInfo = e.target.value;
		this.setState({additionalInfo});
	}

	render() {
		return (
			<Modal 
				className="edit-client-modal"
				show={this.state.show}
				onHide={this.props.onHide}
			>
				<Modal.Header 
					closeButton
				> 
					<Modal.Title> Добавить клиента </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Название огранизации</ControlLabel>
								<FormControl 
									type='text'
									value={this.state.name}
									onChange={this.changeName}
								/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Телефон</ControlLabel>
								 <ReactTelInput
										defaultCountry="ru"
										flagsImagePath={flagsCountriesSrc}
										onChange={this.changePhone}
									/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Дополнительная информация</ControlLabel>
							<FormControl 
								componentClass="textarea" 
								placeholder="..."
								onChange={this.changeTextarea}
								value={this.state.additionalInfo}
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
		)
	}
}

export default EditClientModal;