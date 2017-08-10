import axios from 'axios';
import EventEmitter from 'browser-event-emitter';

class ClientDataService extends EventEmitter {

	getAll() {
		return axios.get('/api/clients')
		.then(response => {
			console.log(response)
			return response.data;
		})
		.catch(error => {
			console.log(error);
		});
	}

	add(client) {
		return axios.post('/api/clients', client)
		.then(response => {
			console.log(response.data);
			this.emit('change');
			return response;
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	remove(id) {
		return axios.delete('/api/clients/' + id)
		.then(response => {
			console.log(response.data);
			this.emit('change');
			return response;
		})
		.catch(error => {
			console.log(error);
		});
	}

}

const clientDataService = new ClientDataService();

export default clientDataService;