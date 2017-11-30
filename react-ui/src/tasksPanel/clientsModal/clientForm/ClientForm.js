import React, {Component} from 'react';
import ReactTelInput from 'react-telephone-input';
import {Button, Modal, ListGroup, FormGroup, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import flagsCountriesSrc from '../../../flags.png';
import FontAwesome from 'react-fontawesome';

import Validation from 'react-validation';
import TextInput from '../../../inputs/TextInput';
import Textarea from '../../../inputs/Textarea';
import FacilitiesList from '../facilitiesList/FacilitiesList';

const renderFacilities = ({fields}) => (
	<ListGroup>
		{fields.map(
			(facility, index) => (
				<li 
					key={index}
					className='list-group-item'
				>
					<Field
						name={`${facility}.name`}
						component={TextInput}
						type='text'
						label="Название"
					/>
					<Field
						name={`${facility}.phone`}
						component={TextInput}
						type='text'
						label="Телефон"
					/>
					<Field
						name={`${facility}.address`}
						component={TextInput}
						type='text'
						label="Адрес"
					/>
					<Field
						name={`${facility}.operator`}
						component={TextInput}
						type='text'
						label="Оператор"
					/>
					<Field
						name={`${facility}.additionalInfo`}
						component={Textarea}
						type='text'
						label="Дополнительная информация"
					/>
					<Button 
						bsStyle='danger'
						onClick={() => fields.remove(index)}
					>
						<FontAwesome
							name='trash'
						/>
					</Button>
				</li>
			)
		)}
		<li className="list-group-item">
			<Button 
				bsStyle='success'
				onClick={() => fields.push({})}
				style={{marginLeft: 20}}
			> 
				Добавить
			</Button>
		</li>
	</ListGroup>
)

let ClientForm = ({mode, handleSubmit, show, onHide, ...props}) => (
	<Modal 
		className="clients-modal"
		show={show}
		onHide={onHide}
	>
		<Modal.Header 
			closeButton
		> 
			<Modal.Title> 
				 {mode === 'edit' ? 'Редактирование клиента' : 'Добавить клиента'}
			</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<form onSubmit={handleSubmit}>
				<Field 
					name='name' 
					component={TextInput} 
					type='text'	
					label='Название огранизации'
				/>
				<Field 
					name='phone' 
					component={TextInput} 
					type='text'	
					label='Телефон'
				/>
				<FormGroup>
					<ControlLabel style={{display: 'block'}}>
						Объекты
					</ControlLabel>
					<FieldArray name='facilities' component={renderFacilities} />
				</FormGroup>
				<Field 
					name='additionalInfo' 
					component={Textarea} 
					type='text'	
					label='Дополнительная информация'
				/>
				<Button type='submit'>
					OK
				</Button>
			</form>
			</Modal.Body>
	</Modal>

)

let ClientEditForm = reduxForm({
	form: 'ClientEdit',
	enableReinitialize: true,
	mode: 'edit'
})(ClientForm)

ClientEditForm = connect(state => ({initialValues: state.entities.clients.editing}))(ClientEditForm);

let ClientAddForm = reduxForm({
	form: 'ClientAddForm',
	mode: 'create'
})(ClientForm)

export {ClientEditForm, ClientAddForm}
