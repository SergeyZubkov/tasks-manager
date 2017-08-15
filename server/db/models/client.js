/**
 * Defining a Client Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
const mongoose = require('mongoose');
// Other oauthtypes to be added

/*
 Client Schema
 */

const ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, lowercase: true},
  phone: { type: String, lowercase: true },
  additionalInfo: String
});

/**
 * Statics
 */

ClientSchema.statics = {};

module.exports = mongoose.model('Client', ClientSchema);