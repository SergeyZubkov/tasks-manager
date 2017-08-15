const _ = require('lodash');
const Task = require('../models/task');
const Client = require('../models/client')

/**
 * List
 */
function getAll(req, res) {
  let isEmpty = false;

  Task
  .find({})
  .count((err, count) => {
    if (count === 0) {
      return res.json([]);
    } else {
      Task
      .find({})
      .populate('client')
      .exec((err, tasks) => {
        console.log(tasks)
        if (err) {
          console.log('Error in first query');
          return res.status(500).send('Something went wrong getting the data');
        }
        if (tasks) {
          console.log(tasks);
          return res.json(tasks)
        }
        
        return res.json([]);
      });
    }
  })

}

/**
 * Add a Task
 */
function add(req, res) {

  Task.create(req.body, (err, task) => {
    if (err) {
      return res.status(400).send(err);
    }
    console.log('create Task');
    console.log(task);

    return res.status(200).send('OK');
  });
}

/**
 * Update a Task
 */
function update(req, res) {
  const query = { _id: req.params.id };
  const data = req.body;
  console.log(data);
    Task.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
}

/**
 * Remove a Task
 */
function remove(req, res) {
  const query = { _id: req.params.id };
  console.log(query);
  Task.findOneAndRemove(query, (err, task) => {
    console.log(task)
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

function addComment(req, res) {
  const query = { _id: req.params.id };
  console.log('add Comment');
  console.log(query);
  const comment = req.body;
    Task.findOne(query, (err, task) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      task.comments.push(comment);

      console.log(task);

      task.save(function(err) {
        return res.status(200).send('Updated successfully');  
      });
  });
}


module.exports = {
  getAll: getAll,
  add: add,
  update: update,
  remove: remove,
  addComment: addComment
}
