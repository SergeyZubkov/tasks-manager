import axios from 'axios';
import EventEmitter from 'browser-event-emitter';
import _ from 'lodash';
import moment from 'moment-timezone';

class TaskDataService extends EventEmitter {

	constructor() {
		super();

		this._tasks = [];
	}

	getTasks() {
		if (this._tasks.length === 0) {
			return axios.get('/api/tasks')
			.then(response => {
				return this._tasks = response.data;
			})
			.catch(error => {
				console.log(error);
			});
		} else {
			return new Promise((resolve, reject) => {
				return resolve(this._tasks);
			})
		}
	}

	addTask(task) {
		console.log(task)
		return axios.post('/api/tasks', task)
		.then(response => {
			this._tasks = response.data;
			console.log(this._tasks)
			this.emit('change');
		})
		.catch(error => {
			console.log(error);
		});
	}

	remove(id) {
		return axios.delete('/api/tasks/'+ id)
		.then(response => {
			const taskDeletedId = id;
			this._tasks = _.filter(this._tasks, (task) => {
				return task._id !== taskDeletedId;
			});
			this.emit('change');
		})
		.catch(error => {
			console.log(error);
		});
	}

	update(id, editedData) {
		console.log(editedData)
		const originalData = _.find(
			this._tasks,
			{_id: id}
		)

		editedData = Object.assign({}, originalData, editedData);

		delete editedData.date

		return axios.put('/api/tasks/'+ id, {editedData, originalData})
		.then(response => {
			const newTask = _.find(response.data, {_id: id});
			console.log(newTask)
			
			this._tasks = response.data;
		
			this.emit('change');
		})
		.catch(error => {
			console.log(error);
		})
	}

	addComment(id, comment) {
		return axios.post('/api/tasks/'+ id +'/comment', comment)
		.then(response => {
			_.find(this._tasks, {_id: id})
			.comments
			.push(comment);
			this.emit('change');
		})
		.catch(error => {
			console.log(error);
		})
	}

	getAllTasksForExecutor(executor) {
		return this._tasks.filter(task => task.executor === executor);
	}
}

const taskDataService = new TaskDataService();

export default taskDataService;