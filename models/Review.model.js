const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // for my User model reference to user IDs
        ref: "User", // Reference to the User model
        required: true
    },
    homeId: {
        type: Schema.Types.ObjectId, // for my Home model references to home IDs
        ref: "Home", // Reference to the Home model
        required: true
    },
    rating: {
        type: String,
        required: true,
       enum: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"]
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const ReviewModel = model("Review", reviewSchema);
module.exports = ReviewModel;
