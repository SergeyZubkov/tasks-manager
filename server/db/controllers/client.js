const omit = require('lodash/omit');

const Client = require('../models/client');
const Facility = require('../models/facility');
const mongoose = require('mongoose');
/**
 * List
 */
function getAll(req, res) {
	Client.find({}).exec((err, clients) => {
		if (err) {
			console.log('Error in first query');
			return res.status(500).send('Something went wrong getting the data');
		}
		if (clients) {
			return res.json(clients);
		}
		return res.json([]);
	});
}

/**
 * Add a client
 */
function add(req, res) {
	let returnClient;

	const {facilities} = req.body;
	req.body.facilities = req.body.facilities.map(fac => fac._id = mongoose.Types.ObjectId());

	Client.create(req.body)
	.then(client => {
		returnClient = client;
		
		facilities.forEach(fac => fac.client = client._id);
		
		const promises = facilities.map(fac => {
			return Facility.create(fac);
		});


		return Promise.all(promises)
	})
	.then(() => Client.findOne({_id: returnClient._id}))
	.then(client => {
		return res.json(client);
	})
	.catch(err => {
		console.log(err);
		return res.status(400).send(err);
	});
}

/**
 * Update a client
 */
function update(req, res) {
	const query = { _id: req.params.id };
	const client = req.body;
	const {facilities} = client;
	console.log(facilities)
	req.body.facilities = req.body.facilities.map(
		fac => fac._id ? fac._id : fac._id = mongoose.Types.ObjectId()
	);
		// return query
	Client.findOneAndUpdate(query, client)
	.then(q => Client.findOne(query))
	.then(client => {
		console.log(client);
		facilities.forEach(fac => fac.client === undefined ? fac.client = client._id : null);
	
		const promises = facilities.map(fac => fac._id ? Facility.findOneAndUpdate(fac._id, omit(fac, '_id')) : Facility.create(fac));

		return Promise.all(promises)
	})
	.then(() => Client.findOne(query))
	.then(client => {
		console.log(client);

		return res.json(client);
	})
	.catch(err => {
		console.log(err);

		return res.status(400).send(err);
	})
}

/**
 * Remove a client
 */
function remove(req, res) {
	const query = { _id: req.params.id };

	Facility.deleteMany({client: req.params.id})
	.then(() => Client.findOneAndRemove(query))
	.then(() => res.status(200).send('Removed Successfully'))
	.catch(err => {
		console.log(err);

		return res.status(200).send(err);
	})
}



module.exports = {
	getAll: getAll,
	add: add,
	update: update,
	remove: remove
}
