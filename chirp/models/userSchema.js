var mongoose = require('mongoose');

var userSchema = {
  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
};

var schema = new mongoose.Schema(userSchema);

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.userSchema = userSchema;