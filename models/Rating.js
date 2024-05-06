const mongoose = require('mongoose');

// Define the schema for the ratings matrix
const RatingSchema = new mongoose.Schema({
    // We don't define any specific fields here for users or movies
    // Instead, we will dynamically add columns and rows as needed
    ratingsMatrix: {
        type: [[Number]], // Matrix of ratings where each row represents a movie and each column represents a user
        default: [[0]] // Start with an empty matrix
    }
});


module.exports = mongoose.model('Rating', RatingSchema);