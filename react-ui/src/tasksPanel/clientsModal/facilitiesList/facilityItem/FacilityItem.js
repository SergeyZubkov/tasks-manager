import React, { Component } from 'react';
// import './FacilityItem.css';

const FacilityItem = ({title, onClick, ...props}) => {

	return (
		<li
			className="client-item list-group-item"
			onClick={onClick}
		>
			{title}
			{props.children}
		</li>
	)
}

export default FacilityItem;
