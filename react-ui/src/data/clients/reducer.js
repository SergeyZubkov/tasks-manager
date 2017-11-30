import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import {combineReducers} from 'redux';

const byId = (state={}, action) => {
	switch (action.type) { 
		case 'ADD_CLIENT': {
			const {clients} = action.response.entities;
			const {result} = action.response;
			const clientId = result;

			return {
				...state,
				[clientId]: clients[clientId]
			}
		}
		case 'UPDATE_CLIENT':
			// action.response = {entities: {clients: {0: {..}, ..}, facilities: {0: {...}, ...}}, result: [id, ..]}
			const {clients} = action.response.entities;
			const updatedClientId = action.response.result[0];
			const updatedClient = clients[updatedClientId];
			return {
				...state,
				[updatedClientId]: updatedClient
			}
			return state;
		case 'DELETE_CLIENT':
			return omit(state, action.id)
		default:
			return state;
	}
}

const facilitiesById = (state={}, action) => {
		switch (action.type) { 
			case 'ADD_CLIENT':
			case 'UPDATE_CLIENT': 
				const {facilities} = action.response.entities;
				return {
					...state,
					...facilities
				}
			case 'DELETE_CLIENT':
				return omitBy(state, action.id)
			default:
				return state;
	}
}

const allIds = (state=[], action) => {
	switch (action.type) {
		case 'ADD_CLIENT': 

			const {result: clientId} = action.response;

			return [...state, clientId];
		case 'DELETE_CLIENT': 
			return state.filter(id => id !== action.id);
		default:
			return state;
	}
}


const info = (state={}, action) => {
	switch (action.type) {
		case 'SHOW_CLIENT_INFO': 
			return action.payload;
		default: 
			return state;
	}
}


const editing = (state={}, action) => {
	switch (action.type) {
		case 'SET_EDITING_CLIENT': 
			return action.payload;
		case 'UNSET_EDITING_CLIENT': 
			return {};
		default: 
			return state;
	}
}

const getClient = (state, id) => {
	console.log('getClient was executed')
	return state.entities.clients.byId[id]
}

const fillClient = (state, client) => {
	const fillFacilities = client.facilities.map(id => state.entities.clients.facilitiesById[id]);
	
	return {...client, facilities: fillFacilities}	
}

export const getClients = (state) => {
	return state.entities.clients.allIds
	.map(id => getClient(state, id))
	.map(client => client.facilities === undefined ?  client : fillClient(state, client))
}

const clients = combineReducers({
	byId,
	facilitiesById,
	allIds,
	info,
	editing
})

export default (state={}, action) => {
	if (action.type === 'FETCH_CLIENTS_SUCCESS') {
		return {
				...state,
				byId: action.response.entities.clients,
				facilitiesById: action.response.entities.facilities,
				allIds: action.response.result
			}
	} else {
		return {...state, ...clients(state, action)}
	}
}