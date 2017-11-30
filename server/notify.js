var nodemailer = require('nodemailer');
var User = require('./db/models/user');

const APP_URL = "https://taskmanageruseduk.herokuapp.com/admin";
const APP_LINK = `<a href="${APP_URL}">Перейти в приложение</a>`;

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

		if (task.author.name !== task.executor.name) {
			User
			.findOne({name: task.executor.name})
			.exec(function(err, executor) {
				var mailOptions = {
				  from: '',
				  to: executor.email,
				  subject: 'Была созданна новая задача',
				  html: "<p>Была созданна новая задача: </p><p>" + task.text + "</p><p>Вы назначены исполнителем</p>" + APP_LINK
				};

				send(mailOptions);
			});	
		}

		if (task.author !== task.responsible) {
			User
			.findOne({name: task.responsible.name})
			.exec(function(err, responsible) {
				var mailOptions = {
				  from: '',
				  to: responsible.email,
				  subject: 'Была созданна новая задача',
				  html: "<p>Была созданна новая задача: </p><p>" + task.text + "</p><p>Вы назначены ответственным</p>" + APP_LINK
				};

				send(mailOptions);
			})
		}
	}
	static wasEditedTask(editedTask, originalTask) {
		let notifedUsers = [
			editedTask.executor,
			editedTask.responsible
		];
		console.log('editedTask');
		console.log(editedTask);
		console.log('originalTask');
		console.log(originalTask);

		notifedUsers = notifedUsers.filter(user => originalTask.author.name !== user.name);

		if (originalTask) {
			if (editedTask.executor.name !== originalTask.executor.name){
				notifedUsers.push(originalTask.executor);
			}
			if (editedTask.responsible.name !== originalTask.responsible.name){
				notifedUsers.push(originalTask.responsible);
			}
		}
		
		notifedUsers.forEach(user => {
			User
			.findOne({name: user.name})
			.exec(function(err, user) {
				let mailOptions = {
				  from: '',
				  to: user.email,
				  subject: 'Задача была изменена',
				  text: 'Задача была изменена',
				 	html: "<p><b>Автор: </b>" + editedTask.author.name + "</p><p><b>Исполнитель: </b>"+ editedTask.executor.name + "</p><p><b>Отвественный: </b>"+ editedTask.responsible.name + "</p><p>" + editedTask.text + "</p>" + APP_LINK
				};

				send(mailOptions);
			});
		});
	}
	static wasDeletedTask(task) {
		let notifedUsers = [
			task.executor,
			task.responsible
		];

		notifedUsers = notifedUsers.filter(person => task.author.name !== person.name);

		notifedUsers.forEach(userName => {
			User
			.findOne({_id: userName})
			.exec(function(err, user) {
				let mailOptions = {
				  from: '',
				  to: user.email,
				  subject: 'Задача была удалена',
				  text: 'Задача была удалена',
				 	html: "<p>" + task.text + "</p>" +APP_LINK
				};

				send(mailOptions);
			});
		});
	}
	static wasMovedTask(task) {

	}
	static wasCompletedTask(task) {

	}
	static wasCommentedTask(task, comment) {
		let notifedUsers = [
			task.author,
			task.executor,
			task.responsible
		];

		notifedUsers = notifedUsers.filter(person => comment.author.name !== person.name);

		notifedUsers.forEach(userName => {
			User
			.findOne({name: userName})
			.exec(function(err, user) {
				let mailOptions = {
				  from: '',
				  to: user.email,
				  subject: 'У задачи появился новый комментарий',
				  text: 'У задачи появился новый коммeнтарий',
				 	html: "<p>" + task.text + "</p>" + APP_LINK
				};

				send(mailOptions);
			});
		});
	}
}