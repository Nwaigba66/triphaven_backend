const router = require("express").Router();

const homeModel = require("../models/Home.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// post route to create a new booking
router.post("/homeId", async (req,res) => {
    try {
       const newHome = await homeModel.create(req.body);
            res.status(201).json(newHome);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to find and update a booking by Id
router.put("/home/:homeId", async (req, res) => {
    const { homeIdId } = req.params;
    try {
        const updatedHome = await homeModel.findByIdAndUpdate(homeId, req.body, { new: true, });
        if (!updatedHome) {
            res.status(404).json({ errorMessage: "Hotel not found" });
        } else {
            res.status(200).json({message: "updated booking", updatedHome });
        }

    } catch (err) {
        res.status(500).json({errorMessage: "Internal server error" });
        console.log("booking not found");
    }
});

// route to delete a booking

router.delete("/home/:homeId", async (req, res) => {
    try{
        const deletedHome = await homeModel.findByIdAndDelete(req.params.Id);
        if (!deletedHome) {
            res.status(404).json({ message: "Room not found" });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(err)
    }
})

// route to find a booking by an Id

router.get("/home/:homeId", isAuthenticated, async (req, res) => {
    try {
        const homeId = req.params.id;
        const home = await homeModel.findById(homeId);
        if(!home){
            res.status(404).json({ message: "Room not found"});
        }
        else {
            res.status(200).json({ message: "Room found"});
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error", error: err.message});
    }
})
module.exports = router;