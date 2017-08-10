/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */
const mongoose = require('mongoose');

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true, lowercase: true},
  email: { type: String, unique: true, lowercase: true },
  password: String
});

/**
 * Statics
 */

UserSchema.statics = {};

module.exports = mongoose.model('User', UserSchema);