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
			  text: 'Была созданна новая задача вы назначены исполнителем'
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
			  text: "Была созданна новая задача вы назначены ответственным"
			};

			send(mailOptions);
		})
	}
	static wasEditedTask(task) {
		User
		.findOne({name: task.executor})
		.exec(function(err, executor) {
			var mailOptions = {
			  from: '',
			  to: executor.email,
			  subject: 'Задача была изменена',
			  text: 'Задача была изменена',
			 	html: "<p>" + task.text + "</p>"
			};

			send(mailOptions);
		});

		User
		.findOne({name: task.responsible})
		.exec(function(err, responsible) {
			var mailOptions = {
			  from: '',
			  to: responsible.email,
			  subject: 'Задача была изменена',
			  text: "Задача была изменена",
			  html: "<p>" + task.text + "</p>"
			};

			send(mailOptions);
		});
	}
	static wasDeletedTask(task) {

	}
	static wasMovedTask(task) {

	}
	static wasCompletedTask(task) {

	}
	static wasCommentedTask(task) {

	}
}