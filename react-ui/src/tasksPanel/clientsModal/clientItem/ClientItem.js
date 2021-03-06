import React, { Component } from 'react';
import './ClientItem.css';

const ClientItem = ({title, onClick, ...props}) => {

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

export default ClientItem;
