
const mongoose = require('mongoose');
const db = require('./constants');
const bluebird = require('bluebird');
// import loadModels from './models';

module.exports = function () {
	  // Find the appropriate database to connect to, default to localhost if not found.
	  function connect() {
	    mongoose.Promise = bluebird;
	    console.log('1')
	    mongoose.connect(db, function(err) {
	      if (err) {
	        console.log(`===>  Error connecting to ${db}`);
	        console.log(`Reason: ${err}`);
	      } else {
	        console.log(`===>  Succeeded in connecting to ${db}`);
	      }
	    });
	  };
	  connect();

	  mongoose.connection.on('error', console.log);
	  mongoose.connection.on('disconnected', connect);

	  // loadModels();
}