const {Schema, model} = require("mongoose");

const reviewSchema = new Schema({

    
})

const ReviewModel = mongoose.model("Review", reviewSchema);
module.exports = ReviewModel;