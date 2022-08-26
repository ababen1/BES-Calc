var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');



// Route for signing up a new user
router.post("/signup", async (req, res) => {
    let data = req.body;
    if (!data.email || !data.password || !data.username) {
        res.json({
            success: false,
            error: "please fill out all fields"
        })
    }
    else {
        try {
            const emailTaken = await User.findOne({ email: data.email });
            if (emailTaken) {
                return await res.status(409).json({
                    "success": false,
                    "field": "email",
                    "message": "Email already taken"
                })
            }
            let new_user = new User({
                email: data.email,
                username: data.username,
            });
            new_user.setPassword(data.password);

            await new_user.save();
            console.log("new user created");
            return await res.status(200).json({
                ...new_user.toAuthJSON(),
                "success": true
            });
        }
        catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;