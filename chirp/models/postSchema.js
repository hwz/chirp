var mongoose = require('mongoose');

var postSchema = {
  created_by: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  text: String
};

var schema = new mongoose.Schema(postSchema);

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.postSchema = postSchema;