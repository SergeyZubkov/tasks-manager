import axios from 'axios';
import {reset} from 'redux-form';
import {normalize, schema} from 'normalizr';

import {addFacilities} from './actions';

const facilitiesSchema = new schema.Entity('facilities',{}, {idAttribute: '_id'});

const clientSchema = new schema.Entity('clients', {
	facilities: [facilitiesSchema]
}, {idAttribute: '_id'})

const clientsSchema = new schema.Array(clientSchema);



export const fetchClients = () => {
	return (dispatch, getStore) => {
		return axios.get('/api/clients')
		.then(res => {
			// {entities: {clients: {}, facilities: {}}, result: []}
			return dispatch({
				type: "FETCH_CLIENTS_SUCCESS", 
				response: normalize(res.data, clientsSchema)
			})
		})
		.catch(err => dispatch({type: "FETCH_CLIENTS_FAILURE", err}))
	}
}

export const addClient = (client) => {
	if (!client.facilities) client.facilities = []

	return (dispatch) => {
		console.log(client);
		return axios.post('/api/clients',  client) 
		.then(res => {
				
			dispatch(reset('ClientAddForm'));
			dispatch({
				type: 'ADD_CLIENT',
				response: normalize(res.data, clientSchema)
			})
		})
	}
}

export const updateClient = (client) => {
	console.log(client);
	return (dispatch) => {
		return axios.put('/api/clients/' + client._id,  client)
		.then(res => dispatch({
			type: 'UPDATE_CLIENT', 
			response: normalize(res.data, clientSchema)
		}))
	}
}

export const showClientInfo = (client) => ({
	type: 'SHOW_CLIENT_INFO',
	payload: client
})

export const setEditingClient = (client) => ({
	type: 'SET_EDITING_CLIENT',
	payload: client
})

export const unsetEditingClient = (client) => ({
	type: 'UNSET_EDITING_CLIENT'
})

export const deleteClient = (id) => {
	return (dispatch) => {
		return axios.delete('/api/clients/' + id)
		.then(res => dispatch({type: 'DELETE_CLIENT', id}))
	}
}
