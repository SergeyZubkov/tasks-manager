/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Other oauthtypes to be added

/*
 User Schema
 */

const Facility = new Schema({
  name: { type: String, unique: true, lowercase: true, trim: true},
  address: { type: String, lowercase: true, sparse: true, trim: true},
  phone: { type: String, sparse: true , trim: true},
  operator: { type: String, sparse: true, trim: true},
  additionalInfo: String,
  client: String
});

/**
 * Statics
 */

Facility.statics = {};

module.exports = mongoose.model('Facility', Facility);