import React, {Component} from 'react';

import { FormGroup, ControlLabel, FormControl} from 'react-bootstrap';


class Textarea extends Component {
	render () {
		const {
			feedbackIcon,
			input,
			label,
			type,
			componentClass,
			meta: { error, warning, touched },
			...props
		} = this.props;

		let message;
		const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

		if ( touched && ( error || warning ) ) {
			message = <span className="help-block">{ error || warning }</span>;
		}

		return (
			<FormGroup validationState={ validationState }>
				<ControlLabel>{ label }</ControlLabel>
				<FormControl { ...input }
							 type={ type }
							 componentClass='textarea'
							 { ...props } />
				{ feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
				{ message }
			</FormGroup>
		);
	}
}

export default Textarea;