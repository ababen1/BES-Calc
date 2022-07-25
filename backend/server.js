const env = require('dotenv').config({ path: "C:/Users/Ben/Documents/ENTER/bes-calculator/.env" });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('./models/Calculator');
require('./models/User');
require('./models/SavedCalculation');

const User = mongoose.model("User");

var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("conntected to db");
    })
    .catch(console.error);


// simple route
app.get("/", (req, res) => {
    console.log(req);
    res.json({ message: "Welcome" });
});

app.post("/signup", (req, res) => {
    let data = req.body;
    if (!data.email || !data.password || !data.username) {
        res.json({
            success: false,
            error: "please fill out all fields"
        })
    }
    else {
        let new_user = new User({
            email: data.email,
            username: data.username
        });
        new_user.setPassword(data.password);
        new_user.save()
            .then(function () {
                console.log("new user created");
                res.json(new_user.toAuthJSON());
            });
    }
});

app.post("/login", (req, res) => {
    let user_data = req.body
    if (!user_data.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }
    else if (!user_data.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }
    else {
        let user = User.findOne({ email: user_data.email })
            .then((user) => {
                if (!user) {
                    res.json({ success: false, error: "User not found." })
                } else {
                    if (user.validPassword(user_data.password)) {
                        res.json({ "success": false, error: "Wrong password." })
                    } else {
                        console.log("logged in")
                        res.json({ success: true, data: user.toAuthJSON() })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({ success: false, error: err })
            })
    }

})

app.listen(5000, () => console.log(`listening on port 5000`));

/*function populate() {
    var Calculator = mongoose.model('Calculator');
    var new_calc = new Calculator({
        description: "test",
        powerKW: 100,
        imax: 99,
    })
    new_calc.save().then(() => {
        console.log("Saved!");
    })
        .catch(console.error)
}*/