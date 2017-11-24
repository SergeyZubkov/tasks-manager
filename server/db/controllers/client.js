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
  console.log(req.body)
  const {facilities} = req.body;
  
  req.body.facilities = req.body.facilities.map(fac => fac._id = mongoose.Types.ObjectId());
  Client.create(req.body)
  .then(client => {
    facilities.forEach(fac => fac.client = client._id);
    
    console.log(facilities[0])
    const promises = facilities.map(fac => Facility.create(fac));

    return Promise.all(promises).then(() => client._id)
  })
  .then((clientId) => Client.find({_id: clientId}))
  .then(client => res.json(client))
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
  const data = req.body;
  console.log(data);
    Client.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
}

/**
 * Remove a client
 */
function remove(req, res) {
  const query = { _id: req.params.id };
  console.log(req.params.id)
  Client.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}



module.exports = {
  getAll: getAll,
  add: add,
  update: update,
  remove: remove
}
