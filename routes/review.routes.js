const router = require("express").Router();

const ReviewModel = require("../models/Review.model");


// post route to create a new rating
router.post("/review", async (req, res) => {
    try{
        const newReview = await ReviewModel.create(req.body);
        res.status(201).json(newReview)

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to find and update a review by Id
router.put("/review", async (req, res) => {
    const { reviewId } = req.params;
    try{
        const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, req.body,  { new: true, });
        if(!updatedReview) {
            res.status(404).json({errormessage: "Review not found"})
        } else {
            res.status().json()
        }

    } catch(err) {
        res.status(500).json({errormessage: "Internal server error" });
        console.log("Review not found");
    }
});

// route to delete a review

router.delete("/:reviewId", async (req, res) => {
    try {
        const deletedReview = await ReviewModel.findByIdAndDelete(req.params.reviewId);
        console.log("Reviews deleted", deletedReview);
        if (!deletedReview){
            res.status(404).json({ errormessage: "Review not found" });
        } else {
            res.status(204).send();
        }
    } catch(err) {
        res.status(500).json({errormessage: "Internal server error"});
        console.log(err);
    }
});

// route to find a review by an Id

router.get("/:reviewId", async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const ReviewModel = await ReviewModel.findById(reviewId);
        if(!reviews){
            res.status(404).json({ message: "Reviews not found"});
        }
        else {
            res.status(200).json({ message: "Reviews found"});
        }
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message})
    }
});

// get all reviews
router.get('/reviews', async (req, res) => {
    try {
        const allReviews = await ReviewModel.find(allReviews);
        res.status(200).json(allReviews);

    } catch(err) {
        res.status(505).json({erormessage: "Internal server error" })
        console.log(err)
    }
})

// get all reviews by userId and populate with the User Data
// router.get("/:reviewId", async (req, res) => {
//     ReviewModel.findById(req.params.reviewId)
//     .populate("User")
//     try {

//     } catch (err) {
        
//     }
// })

module.exports = router;