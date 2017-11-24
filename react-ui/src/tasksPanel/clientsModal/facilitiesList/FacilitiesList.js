import React, {Component} from 'react';
import {ListGroup, Button, FormGroup, ControlLabel} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import FacilityItem from './facilityItem/FacilityItem';

class FacilitiesList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showFacilityAddForm: false
		}
	}

	showFacilityAddForm = () => {
		this.setState({showFacilityAddForm: true})
	}

	closeFacilityAddForm = () => {
		this.setState({showFacilityAddForm: false})
	}

	showFacilityEditForm = (facility) => () => {
		this.setState({showFacilityEditForm: true})
	}

	closeFacilityEditForm = () => {
		this.setState({showFacilityEditForm: false})
	}

	deleteFacility = (facility) => () => {

	}

	renderFacility = (facility) => {
		return (
			<FacilityItem
				key={facility._id}
				title={facility.title}
			>
				<Button 
					bsStyle='default'
					onClick={this.showFacilityEditForm(facility)}
				>
					<FontAwesome
						name='edit'
					/>
				</Button>
				<Button 
					bsStyle='danger'
					onClick={this.deleteFacility(facility)}
				>
					<FontAwesome
						name='trash'
					/>
				</Button>
			</FacilityItem>
		)
	}

	render() {
		return (
			<FormGroup>
				<ControlLabel style={{display: 'block'}}>
					Объекты
					<Button 
						bsStyle='success'
						onClick={this.showFacilityAddForm}
						style={{marginLeft: 20}}
					> 
						Добавить
					</Button>
				</ControlLabel>
				<ListGroup>
					{[{title: 'test'}].map(this.renderFacility)}
				</ListGroup>
			</FormGroup>
		)
	}
}

export default FacilitiesList;