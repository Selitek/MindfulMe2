const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who posted the comment
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    textContent: { type: String, required: true },
    imageContent: { type: String }, // Assuming image content is stored as a URL
    microsoftId: { type: String, required: true },
    comments: [CommentSchema] // Array of comments
});

module.exports = mongoose.model('Post', PostSchema);
