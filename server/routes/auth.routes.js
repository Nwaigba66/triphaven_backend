const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../Middleware/jwt.middleware");

//signup
router.post('/signup', async (req, res) => {
    const{ title, firstName, lastName, userName, email, password } = req.body;

    if(title === "" || firstName === "" || lastName === "" || userName === "" || email === "" || password === "") {
        res.status(400).json({ message: "provide title, firstName, lastName, userName, email, and password" });
        
    }

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
}
    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
  });
  return;
}
try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
        res.status(409).json({ message: "email already taken" })

    } else {
        //before creating a user make sure to hash his or her password
        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const hashedUser = { ...req.body, password: hashedPassword };

        const createdUser = await UserModel.create(hashedUser);
        console.log("User created", createdUser);
        res.status(201).json(createdUser); 
    }
} catch (err) {
        console.log("Internal server error", err)
        res.status(500).json(err)
    }
});

//login
router.post('/login', async (req, res) => {
    const { email, userName, password } = req.body;
    try {
        const foundUser = await UserModel.findOne({ email });
        if (!foundUser) {
           res.status(400).json({ message: "No user with this email found" });
        } else {
            const PasswordCorrect = bcrypt.compareSync(password, foundUser.password );
            if (!PasswordCorrect) {
                res.status(400).json({ message: "Incorrect password!" })
            } else {
                // Deconstruct the user object to omit the password
                const {_id, userName, email} = foundUser;

                // Create an object that will be set as the token payload
                const payload = { _id, email, userName };

                 // Create and sign the token
                const authToken = jwt.sign( payload, process.env.TOKEN_SECRET, { 
                    algorithm: 'HS256', 
                    expiresIn: "6h", 
                });
                 // Send the token as the response
                 res.status(200).json({ authToken: authToken })
                }
            }  
        }
            catch (err) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });


//verify

router.get("/verify", isAuthenticated, (req, res) => {
  console.log("verify route", req.payload);
  // the token is all good
  res.status(200).json(req.payload);
});

module.exports = router;