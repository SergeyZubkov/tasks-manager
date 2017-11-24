const _ = require('lodash');
const Task = require('../models/task');
const Client = require('../models/client');
const Notify = require('../../notify');
const moment = require('moment');
/**
 * List
 */
function getAll(req, res) {
	Task
	.find({})
	.count((err, count) => {
		if (count === 0) {
			return res.json([]);
		} else {
			Task
			.find({})
			.exec((err, tasks) => {
				const tasksQueries = [];
				if (err) {
					console.log('Error in first query');
					return res.status(500).send('Something went wrong getting the data');
				}

				// tasks.forEach(task => {
				// 	tasksQueries.push(
				// 		Task.findOneAndUpdate({_id: task._id}, {priority: 0})
				// 	)
				// })
				// return Promise.all(tasksQueries);
				return Promise.resolve(tasks)
			})
			.then((tasks) => {

				return res.json(tasks);
			})
		}
	})

}

/**
 * Add a Task
 */
function add(req, res) {
	const priorityNewTask = req.body.priority;
	const tasksQueries = [];

	const isPriorityUsed = () => {
		// ищем все задачи данного исполнителя со значением priority больше нуля
		return Task
		.find({
			executor: req.body.executor,
			priority: {$gt: 0}
		},
		// select оставляет _id, результат получается - [{_id: ..., priority: 1}, {...}]
		'priority')
		.then((tasks) => {
			let isUsed;
			// проверяем используется ли уже знанчение priority у новой задачи
			if (tasks) {
				isUsed = tasks.some(t => t.priority === priorityNewTask);
			}

			// Если новая задача имеет приоритет и он уже назначен для какой-то задачи, то
			if (isUsed) {
				// находим все задачи данного исполнителя со значением priority больше или
				// равному значению priotiy новой задачи
				return Task
							.find({
								executor: req.body.executor,
								priority: {$gte: priorityNewTask}
							})
							// затем создаем цепочку промисов увеличивающих priority
							.then(tasks => {
								tasks.forEach(task => {
									console.log(task)
									tasksQueries
									.push(
										Task
										.findOneAndUpdate(
											{_id: task._id},
											{priority: task.priority + 1}
										)
									);
								});
								return Promise.all(tasksQueries);
							})
			}
			else return Promise.resolve();
		})
	}

	(priorityNewTask ?  isPriorityUsed() : Promise.resolve())
	.then(() => {
		Task.create(req.body, (err, task) => {
			if (err) {
				return res.status(400).send(err);
			}
			console.log('create Task');
			console.log(task);

			Notify.wasCreatedTask(task);

			Task
			.find({})
			.exec((err, tasks) => res.json(tasks));
		});
	})
	.catch((err) => console.log(err))
}

/**
 * Update a Task
 */
function update(req, res) {

	const query = { _id: req.params.id };
	let {
		editedData,
		originalData
	} = req.body;

	const orgCol = originalData.column,
				edtCol = editedData.column;

	// Если поменялась колонка размещения задачи
	if (orgCol !== edtCol) {
		if (edtCol === 'Завершенные'||edtCol === 'Замороженные') {
			editedData.priority = 0;
			if (orgCol !== 'Завершенные'&&orgCol !== 'Замороженные') {
				const clientTimeZone = moment.tz.guess();
				editedData.dateClose = moment().tz(clientTimeZone);
			}
		} else if (orgCol !== "Задачи"&&edtCol === 'Выполняются') {
			editedData.priority = 1;
			editedData.dateClose = null;
		}
	}

	const changePriorityForOtherTaskIfNeed = () => {
		const operationsQueue = [];
		return new Promise((resolve, reject) => {
			if ((editedData.priority > originalData.priority)&&
				(originalData.priority !== 0)||
				(editedData.priority === 0&&originalData.priority > 0)) {
				const operationsQueue = [];
				Task
				.find({executor: editedData.executor})
				.where('priority')
				.gt(originalData.priority)
				.lte(editedData.priority === 0&&originalData.priority > 0 ? 999 : editedData.priority)
				.exec((err, tasks) => {
					console.log('decrease priority')
					console.log(tasks);
					tasks.forEach(t => {
						operationsQueue.push(Task.findOneAndUpdate({_id: t._id}, {priority: t.priority-1}));
					});
					Promise.all(operationsQueue).then(() => resolve())
				})
			} else if (editedData.priority < originalData.priority||
								 (originalData.priority === 0&&editedData.priority > 0)) {
				Task
				.find({executor: editedData.executor})
				.where('priority')
				.nor([{priority: 0}])
				.gte(editedData.priority)
				.lt(originalData.priority === 0&&editedData.priority > 0 ? 999 : originalData.priority)
				.exec((err, tasks) => {
					console.log('increase priority')
					console.log(tasks)
					tasks.forEach(t => {
						operationsQueue.push(Task.findOneAndUpdate({_id: t._id}, {priority: t.priority+1}));
					});
					Promise.all(operationsQueue).then(() => resolve());
				})
			} else {
				resolve();
			}
		})
	}

	changePriorityForOtherTaskIfNeed()
	.then(() => {
		// {new: true} используется, чтобы получить измененную задачу в cb;
		Task.findOneAndUpdate(query, editedData, {new: true}, (err, updatedTask) => {
			if (err) {
				console.log('Error on save!');
				console.log(err);
				return res.status(500).send('We failed to save for some reason');
			}

			console.log('aaaaa')

			Task
			.find()
			.exec((err, tasks) => {
				Notify.wasEditedTask(editedData, originalData);

				return res.json(tasks);
			})
		})
	})
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

		Notify.wasDeletedTask(task);

		return res.status(200).send('Removed Successfully');
	});
}

function addComment(req, res) {
	const query = { _id: req.params.id };
	console.log('add Comment');
	console.log(query);
	const comment = req.body;
	Task
	.findOne(query)
	.exec((err, task) => {
		if (err) {
			console.log('Error on save!');
			return res.status(500).send('We failed to save for some reason');
		}

		task.comments.push(comment);

		task.save(function(err) {
			Notify.wasCommentedTask(task);
			return res.json(task);
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
