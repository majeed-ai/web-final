const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  images: [{ type: String }],
  text: { type: String },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
