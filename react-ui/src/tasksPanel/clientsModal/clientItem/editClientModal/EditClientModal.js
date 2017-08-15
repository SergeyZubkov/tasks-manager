import React, {Component} from 'react';
import './EditClientModal.css';
import clientDataService from '../../../../data/clientDataService';
import ReactTelInput from 'react-telephone-input';
import {Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import flagsCountriesSrc from '../../../../flags.png';
import Validation from 'react-validation';


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


	submit = (e) => {
		e.preventDefault();
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
					<Modal.Title> Редактировать информацию о клиенте </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Validation.components.Form>
						<FormGroup>
							<ControlLabel>Название огранизации</ControlLabel>
								<Validation.components.Input 
									name='name'
									className='form-control'
									type='text'
									value={this.state.name}
									validations={['required']}
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
							<Validation.components.Textarea 
								name='additionalInfo'
								className="form-control" 
								placeholder="..."
								onChange={this.changeTextarea}
								value={this.state.additionalInfo}
								validations={['required']}
							/>
						</FormGroup>
						<Validation.components.Button
							className='btn btn-default'
							onClick={this.submit}
						>
							Добавить
						</Validation.components.Button>
					</Validation.components.Form>
				</Modal.Body>
			</Modal>
		)
	}
}

export default EditClientModal;