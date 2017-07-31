import axios from 'axios';

class DataService {

	getColumns() {
		return axios.get('/api')
		.then(response => {
			return response.data.columns;
		})
		.catch(error => {
			console.log(error);
		});
	}

	postData() {
		axios.then(response => {
			console.log(response);
			return 
		})
		.catch(error => {
			console.log(error);
		});
	}

	addTask(task) {
		axios.post('/api')
		.then(response => {
			console.log(response);
			return 
		})
		.catch(error => {
			console.log(error);
		});
	}

	getUsers() {
		return axios.get('/api/users')
		.then(response => {
			console.log(response)
			return response.data;
		})
		.catch(error => {
			console.log(error);
		});
	}
}

const dataService = new DataService();

export default dataService;