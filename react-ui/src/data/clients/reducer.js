import omit from 'lodash/omit';
import {combineReducers} from 'redux';

const client = (state={}, action) => {
	switch (action.type) {
		case 'UPDATE_CLIENT':
			const {newData} = action;
			return {
				...state,
				newData
			}
		case 'ADD_FACILITY':
			return {
				...state,
				facilities: [...state.facilities, action.facility]
			}
		default:
			return state
	}
}

const clients = (state={}, action) => {
	switch (action.type) { 
		case 'FETCH_CLIENTS_SUCCESS':
			return action.clients
		case 'FETCH_CLIENTS_FAILURE':
			console.log(action.err)
			return state;
		case 'ADD_CLIENT':
			return {
				...state,
				[action._id]: action.client
			}
		case 'UPDATE_CLIENT':
			return {
				...state,
				[action._id]: client(state[action._id], action)
			}
		case 'ADD_FACILITY':
			return {
				...state,
				[action._id]: client(state[action.facility.client], action)
			}
		case 'DELETE_CLIENT':
			return omit(state, action._id)
		default:
			return state;
	}
}

const result = (state=[], action) => {
	switch (action.type) {
		case 'ADD_CLIENT': 
			return [...state, action.client];
		case 'DELETE_CLIENT': 
			return state.filter(id => id !== action._id);
		default:
			return state;
	}
}

const facilities = (state={}, action) => {
		switch (action.type) { 
			case 'ADD_FACILITY':
				return {
					...state,
					[action._id]: action.facility
				}
			case 'UPDATE_FACILITY':
				return {
					...state,
					[action._id]: client(state[action._id], action)
				}
			case 'DELETE_FACILITY':
				return omit(state, action._id)
			default:
				return state;
	}
}

const clientInfo = (state={}, action) => {
	switch (action.type) {
		case 'SHOW_CLIENT_INFO': 
			return action.payload;
		default: 
			return state;
	}
}


const clientEditing = (state={}, action) => {
	switch (action.type) {
		case 'SET_EDITING_CLIENT': 
			delete action.payload.facilities;
			return action.payload;
		case 'UNSET_EDITING_CLIENT': 
			return {};
		default: 
			return state;
	}
}

export const getClients = (state) => {
	return state.entities.result.map(id => state.entities.clients[id])
}

export default combineReducers({
	clients,
	facilities,
	result
})