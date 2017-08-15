import axios from 'axios';
import EventEmitter from 'browser-event-emitter';

class TaskDataService extends EventEmitter {

	getTasks() {
		return axios.get('/api/tasks')
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(error => {
			console.log(error);
		});
	}

	addTask(task) {
		axios.post('/api/tasks', task)
		.then(response => {
			this.emit('change');
			return response;
		})
		.catch(error => {
			console.log(error);
		});
	}

	remove(id) {
		console.log(id);
		return axios.delete('/api/tasks/'+ id)
		.then(response => {
			console.log(response);
			this.emit('change');
			return true;
		})
		.catch(error => {
			console.log(error);
		});
	}

	update(id, newData) {
		return axios.put('/api/tasks/'+ id, newData)
		.then(response => {
			this.emit('change');
			return true;
		})
		.catch(error => {
			console.log(error);
		})
	}

	addComment(id, comment) {
		return axios.post('/api/tasks/'+ id +'/comment', comment)
		.then(response => {
			this.emit('change');
			return true;
		})
		.catch(error => {
			console.log(error);
		})
	}
}

const taskDataService = new TaskDataService();

export default taskDataService;