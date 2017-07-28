import axios from 'axios';

class DataService {

	constructor() {

	}

	getData() {
		return axios.get('/api')
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	postData() {
		axios.then(function (response) {
			console.log(response);
			return 
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export default DataService;