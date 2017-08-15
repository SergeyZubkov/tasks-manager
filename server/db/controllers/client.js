const Client = require('../models/client');

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
  Client.create(req.body, (err, client) => {
    if (err) {
      return res.status(400).send(err);
    }
    console.log(client);

    return res.status(200).send('OK');
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
