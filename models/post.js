const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String }, // Add this line
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
