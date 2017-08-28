/**
 * Schema Definitions
 *
 */
const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const ComentSchema = new mongoose.Schema({
	author: String,
	authorId: String,
	text: String,
	date: {type: Date}
});

const TaskSchema = new mongoose.Schema({
	author: String,
	executor: String,
	column: String,
	client: {type: Schema.Types.ObjectId , ref: 'Client', autopopulate: true},
	responsible: String,
	comments: [ComentSchema],
  text: String,
  date: Date,
  deadline: Date,
  priority: {type: Number, default: 0},
  dateClose: Date
});

// не использовать стрелочные фун. теряется контекст
const deleteClientUndefined = function(next) {
	let newData = this._update;
	if (!newData.client) {
		this.update({$unset: {client: ''}})
	}
	next();
}


TaskSchema.pre('findOneAndUpdate', deleteClientUndefined);


TaskSchema.plugin(autopopulate);

// If no path is given, all date fields will be applied 
// TaskSchema.plugin(timeZone);
// ComentSchema.plugin(timeZone);


// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
module.exports = mongoose.model('Task', TaskSchema);
