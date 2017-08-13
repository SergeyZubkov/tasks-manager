import axios from 'axios';
import EventEmitter from 'browser-event-emitter';

class DataService extends EventEmitter {

	constructor() {
		super();

		this._currentUser = null;
	}

	getCurrentUser() {
		return this._currentUser;
	}

	login(credentials) {
		return axios.post('/login', credentials)
		.then(response => {
			return response;
		})
		.catch(error => {
			console.log(error);
		});
	}

	checkAuth(token) {
		return axios.get('/checkAuth', {
			headers: {'Authorization': `${token}`}
		})
		.then(response => {
			this._currentUser = response.data;
			return response;
		})
		.catch(error => {
			return new Promise((resolve, reject) => {
				return reject();
			})
		});
	}

	getUsers() {
		return axios.get('/api/users')
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.log(error);
		});
	}

	addUser(user) {
		return axios.post('/api/users', user)
		.then(response => {
			this.emit('change');
			return true
		})
		.catch(error => {
			console.log(error);
		});
	}

	deleteUser(id) {
		return axios.delete('/api/users/'+ id)
		.then(response => {
			this.emit('change');
			return true;
		})
		.catch(error => {
			console.log(error);
		});
	}

	updateUser(id, newData) {
		return axios.put('/api/users/'+ id, newData)
		.then(response => {
			this.emit('change');
			return true;
		})
		.catch(error => {
			console.log(error);
		})
	}
}

const dataService = new DataService();

export default dataService;