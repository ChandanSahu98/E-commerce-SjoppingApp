const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    rating : Number,
    comment : String,
    author : String
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;