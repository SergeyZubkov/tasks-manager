
/**
 * Defining a Client Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;
// Other oauthtypes to be added

/*
 Client Schema
 */

const ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, lowercase: true},
  phone: {type: String, index: false},
  additionalInfo: String,
  facilities: [{type: Schema.Types.ObjectId, ref: 'Facility', autopopulate: true}]
});

ClientSchema.plugin(autopopulate);

/**
 * Statics
 */

ClientSchema.statics = {};

module.exports = mongoose.model('Client', ClientSchema);