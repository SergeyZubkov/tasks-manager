import axios from 'axios';
import EventEmitter from 'browser-event-emitter';
import _ from 'lodash';

class DataService extends EventEmitter {

	constructor() {
		super();

		this._currentUser = null;
		this._users = [];
	}

	getCurrentUser() {
		return this._currentUser;
	}

	login(credentials) {
		return axios.post('/login', credentials)
		.then(response => {
			return response;
		})
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
		if (this._users.length === 0) {
			return axios.get('/api/users')
			.then(response => {
				return this._users = response.data;
			})
			.catch(error => {
				console.log(error);
			});
		} else {
			return new Promise((resolve, reject) => {
				return resolve(this._users);
			})
		}
	}

	addUser(user) {
		return axios.post('/api/users', user)
		.then(response => {
			this._users.push(response.data)
			this.emit('change');
		})
		.catch(error => {
			console.log(error);
		});
	}

	deleteUser(id) {
		return axios.delete('/api/users/'+ id)
		.then(response => {
			const userDeletedId = response.data;
			this._users = _.filter(this._users, (user) => {
				return user._id !== userDeletedId;
			});
			this.emit('change');
		})
		.catch(error => {
			console.log(error);
		});
	}

	updateUser(id, newData) {
		return axios.put('/api/users/'+ id, newData)
		.then(response => {
			let updatedUser = _.extend({_id: id}, newData);

			_.extend(
				_.find(this._users, { _id: updatedUser._id }),
				updatedUser);

			this.emit('change');
		})
		.catch(error => {
			console.log(error);
		})
	}

	getUserRolesForTask(task) {
		return _.map(_.pick(task, ['author', 'executor', 'responsible']),
			v => v === this._currentUser.name
		);
	}
}

const dataService = new DataService();

export default dataService;
