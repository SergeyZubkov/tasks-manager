const omit = require('lodash/omit');

const Client = require('../models/client');
const Facility = require('../models/facility');
const mongoose = require('mongoose');

const Helpers = require('./helpers')
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

	const {client, facilities} = Helpers.prepareReceivedDataForClient(req);

	Client.create(client)
	.then(client => Helpers.ifNeedUpdateOrCreateFacilities(facilities, client))
	.then(result => {
		const {client, newFacilities} = result;
		
		return Helpers.ifNeedAddFacilityToClient(newFacilities||facilites, client)
	})
	.then(client => Client.findOne({_id: client._id}))
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
	const {client, facilities} = Helpers.prepareReceivedDataForClient(req);

		// return query
	Client.findOneAndUpdate(query, client, {new: true})
	.then(client => Helpers.ifNeedRemoveFacilities(facilities, client))
	.then(client => Helpers.ifNeedUpdateOrCreateFacilities(facilities, client))
	.then(result => {

		const {client, newFacilities} = result;
		
		return Helpers.ifNeedAddFacilityToClient(newFacilities||facilites, client)
	})
	.then(client => Client.findOne({_id: client._id}))
	.then(client => {
		return res.json(client);
	})
	.catch(err => {
		console.log(err);
		return res.status(400).send(err);
	});
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
