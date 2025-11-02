const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  userId: String,
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  content: { type: String, required: true },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', PostSchema);
