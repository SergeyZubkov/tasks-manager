import React from 'react';
import ReactDOM from 'react-dom';
import './Dropdown.css';
import {Transition} from 'react-overlays';
import {listen} from 'dom-helpers/events';
import {contains} from 'dom-helpers/query';

class Dropdown extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isOpen: false,
			orentationHorizontal: 'right',
			orentationVertical: 'bottom',
			orentationHorizontalInitial: 'right',
			orentationVerticalInitial: 'bottom'
		}
	}

	componentDidMount() {
		this.documentListener = listen(document, 'click', this.handleDocumentClick, false);
		this.resizeListener = listen(document, 'resize', this.updatePosition, false);
		this.updatePosition();
	}

	updatePosition() {
		const titleRect = ReactDOM.findDOMNode(this.dropdownTitle).getBoundingClientRect();
		const optionsRect = ReactDOM.findDOMNode(this.dropdownOptions).getBoundingClientRect();
		const positionState = {
			orentationHorizontal: this.state.orentationHorizontal,
			orentationVertical: this.state.orentationVertical
		}

		if (titleRect.left + optionsRect.width > window.innerWidth) {
			positionState.orentationHorizontal = 'right';
		} else if (optionsRect.left < 0) {
			positionState.orentationHorizontal = 'left';
		} else {
			positionState.orentationHorizontal = this.state.orentationHorizontalInitial;
		}
		if (titleRect.bottom + optionsRect.height > window.innerHeight) {
			positionState.orentationVertical = 'top';
		} else if (optionsRect.top < 0) {
			positionState.orentationVertical = 'bottom';
		} else {
			positionState.orentationVertical = this.state.orentationVerticalInitial;
		}

		if (positionState.orentationHorizontal !== this.state.orentationHorizontal
				||positionState.orentationVertical !== this.state.orentationVertical)  {
			this.setState(positionState);
		}

	}

	toggleOpen(newState) {
		this.updatePosition();

		this.setState(newState);

	}

	handleClick = (e) => {
		console.log(e.target)
		const isOpen = this.state.isOpen;
		if (isOpen) {
			this.toggleOpen({isOpen: false})
		} else {
			this.toggleOpen({isOpen: true})
		}
	}

	handleDocumentClick = (e) => {
		if (this.handleThisClick(e)) {
			this.toggleOpen({isOpen: false});
		}
	}

	handleThisClick(e) {
		const isOpen = this.state.isOpen;
		const title= this.dropdownTitle;

		return isOpen&&e.target !== title
					 &&!contains(ReactDOM.findDOMNode(title), e.target);
	}

	componentWillUnmount() {
		this.documentListener();
		this.resizeListener();
	}

	render() {
		const childrens = React.Children.map(this.props.children, (c) => {
			return React.cloneElement(c, {
				className: 'dropdown-option'
			})
		});

		return (
			<div 
				className={`dropdown ${this.props.className||''}`}
			>
				<div className='dropdown-title' 
					ref={dropdownTitle => this.dropdownTitle = dropdownTitle}
					onClick={this.handleClick}
				>
					{this.props.title}
				</div>
				<Transition
					in={this.state.isOpen}
					exitingClassName='exiting'
					enteredClassName='entered'
					enteringClassName='entering'
				>
					<div 
						style={{visibility: !this.state.isOpen ? 'hidden' : 'visible'}} 
						className={`dropdown-options dropdown-options_${this.state.orentationHorizontal} dropdown-options_${this.state.orentationVertical}`}
						ref={dropdownOptions => this.dropdownOptions = dropdownOptions }
					>
						{childrens}
					</div>
				</Transition>
			</div>
		)
	}
}

export default Dropdown;