const Client = require('../models/client');
const Facility = require('../models/facility');
const difference = require('lodash/difference');
const isArray = require('lodash/isArray');

const prepareReceivedDataForClient = (req) => {
	console.log(req.body);
	const client = req.body;
	const facilities = client.facilities||undefined;

	delete client.facilities;

	return {client, facilities};
}

const ifNeedRemoveFacilities = (facilities, client) => {
		// вычитает из первого второй
	// 1) [] - [1,2] = []     2) [1,2] - [] = [1,2]
	const removedFacilitiesIds = difference(client.facilities, facilities);

	const promises = removedFacilitiesIds.map(id => Facility.findByIdAndRemove(id))

	const res = promises ? Promise.all(promises) : Promise.resolve();

	return res.then(() => Promise.resolve(client));
}

const ifNeedUpdateOrCreateFacilities = (facilities, client) => {
	if (facilities.lenth === 0) return Promise.resolve(client);

	facilities.forEach(fac => fac.client = client._id);

	const promises = facilities.map(
		fac => (fac._id)
		? Facility.findByIdAndUpdate(fac._id, fac, {new: true})
		: Facility.create(fac)
	)

	return Promise.all(promises).then((res) => Promise.resolve({client, newFacilities: res}))
}

const ifNeedAddFacilityToClient = (facilities, client) => {
	console.log('facilities');
	console.log(facilities)
	if (facilities) {
		const ids = facilities.map(fac => fac._id)
		return Client.findByIdAndUpdate(client._id, {facilities: ids}, {new: true})
	} else {
		return Promise.resolve(client);
	}
}


const isNotEmpty = (facilities) => {

	return (
		facilities!==undefined&&
		facilities!==null
	)
}

module.exports = {
	prepareReceivedDataForClient: prepareReceivedDataForClient,
	ifNeedRemoveFacilities: ifNeedRemoveFacilities,
	ifNeedUpdateOrCreateFacilities: ifNeedUpdateOrCreateFacilities,
	ifNeedAddFacilityToClient: ifNeedAddFacilityToClient,
	isNotEmpty: isNotEmpty
}