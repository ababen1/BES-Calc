var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');



// Route for logging in with an email and password
// Returns a json web token
router.post("/login", async (req, res) => {
    let user_data = req.body
    if (!user_data.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }
    else if (!user_data.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }
    else {
        try {
            const user = await User.findOne({ email: user_data.email });
            if (!user) {
                res.json({ success: false, error: "User not found." })
            } else {
                if (!user.validPassword(user_data.password)) {
                    res.json({ "success": false, error: "Wrong password." })
                } else {
                    console.log("logged in")
                    res.json({ success: true, data: user.toAuthJSON() })
                }
            }
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, error: JSON.stringify(err) })
        }
    }
})

// Route for getting the current logged in user with a json web token
router.get("/loggeduser", (req, res) => {
    let token = req.headers.auth;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        res.json({ "success": true, data: decoded })
    } catch (err) {
        res.json({ "success": false, error: err })
    }
});

module.exports = router;