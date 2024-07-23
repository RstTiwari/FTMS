const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  entityType: {
    type: String, // e.g., 'Customer', 'Invoice', 'Payment'
    required: true,
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  additionalInfo: {
    type: Map,
    of: Schema.Types.Mixed, // To store additional details
  },
});

const Comment = mongoose.model('Comment', commentSchema,"comments");

module.exports = Comment;
