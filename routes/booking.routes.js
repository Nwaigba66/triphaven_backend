const router = require("express").Router();

const bookingModel = require("../models/Booking.model");
// const { isAuthenticated } = require("../middleware/jwt.middleware");

// post route to create a new booking
router.post("/bookingId", async (req,res) => {
    try {
       const newBooking = await bookingModel.create(req.body);
            res.status(201).json(newBooking);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to find and update a booking by Id
router.put("/:bookingId", async (req, res) => {
    const { bookingId } = req.params;
    try {
        const updatedBooking = await bookingModel.findByIdAndUpdate(bookingId, req.body, { new: true, });
        if (!updatedBooking) {
            res.status(404).json({ errorMessage: "Booking not found" });
        } else {
            res.status(200).json({message: "updated booking", updatedBooking });
        }

    } catch (err) {
        res.status(500).json({errorMessage: "Internal server error" });
        console.log("booking not found");
    }
});

// route to delete a booking

router.delete("/:bookingId", async (req, res) => {
    try{
        const deletedBooking = await bookingModel.findByIdAndDelete(req.params.bookingId);
        if (!deletedBooking) {
            res.status(404).json({ message: "Booking not found" });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(err)
    }
})

// route to find a booking by an Id

router.get("/:bookingId", async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await bookingModel.findById(bookingId);
        if(!booking){
            res.status(404).json({ message: "Booking not found"});
        }
        else {
            res.status(200).json({ message: "Booking found"});
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error", error: err.message});
    }
})
module.exports = router;