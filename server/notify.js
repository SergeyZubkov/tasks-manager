var nodemailer = require('nodemailer');
var User = require('./db/models/user');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tasks.manager.app@gmail.com',
    pass: 'H6kfkb1aRJ96CTI'
  }
});

var send = function(mailOptions) {
		transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}


module.exports = class Notify {
	static wasCreatedTask(task) {
		var executorEmail,
				responsibleEmail;

		User
		.findOne({name: task.executor})
		.exec(function(err, executor) {
			var mailOptions = {
			  from: '',
			  to: executor.email,
			  subject: 'Была созданна новая задача',
			  html: "<p>Была созданна новая задача: </p><p>" + task.text + "</p><p>Вы назначены исполнителем</p>"
			};

			send(mailOptions);
		});

		User
		.findOne({name: task.responsible})
		.exec(function(err, responsible) {
			var mailOptions = {
			  from: '',
			  to: responsible.email,
			  subject: 'Была созданна новая задача',
			  html: "<p>Была созданна новая задача: </p><p>" + task.text + "</p><p>Вы назначены ответственным</p>"
			};

			send(mailOptions);
		})
	}
	static wasEditedTask(editedTask, originalTask) {
		let addressList = [
			editedTask.executor,
			editedTask.responsible
		];

		if (originalTask) {
			if (editedTask.executor !== originalTask.executor){
				addressList.push(originalTask.executor);
			}
			if (editedTask.responsible !== originalTask.responsible){
				addressList.push(originalTask.responsible);
			}
		}
		
		addressList.forEach(userName => {
			User
			.findOne({name: userName})
			.exec(function(err, user) {
				let mailOptions = {
				  from: '',
				  to: user.email,
				  subject: 'Задача была изменена',
				  text: 'Задача была изменена',
				 	html: "<p>" + editedTask.text + "</p>"
				};

				send(mailOptions);
			});
		});
	}
	static wasDeletedTask(task) {
		let addressList = [
			task.executor,
			task.responsible
		];

		addressList.forEach(userName => {
			User
			.findOne({name: userName})
			.exec(function(err, user) {
				let mailOptions = {
				  from: '',
				  to: user.email,
				  subject: 'Задача была удалена',
				  text: 'Задача была удалена',
				 	html: "<p>" + task.text + "</p>"
				};

				send(mailOptions);
			});
		});
	}
	static wasMovedTask(task) {

	}
	static wasCompletedTask(task) {

	}
	static wasCommentedTask(task) {
		let addressList = [
			task.author,
			task.executor,
			task.responsible
		];

		addressList.forEach(userName => {
			User
			.findOne({name: userName})
			.exec(function(err, user) {
				let mailOptions = {
				  from: '',
				  to: user.email,
				  subject: 'У задачи появился новый комментарий',
				  text: 'У задачи появился новый коммeнтарий',
				 	html: "<p>" + task.text + "</p>"
				};

				send(mailOptions);
			});
		});
	}
}