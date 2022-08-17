const path = require('path');
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const app = express();
const auth = require("./auth");


require('./models/Calculator');
require('./models/User');
require('./models/SavedCalculation');

const User = mongoose.model("User");

var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend", "build")))

mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("conntected to db");
    })
    .catch(console.error);

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

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
            username: data.username,
        });
        new_user.setPassword(data.password);
        new_user.save()
            .then(function () {
                console.log("new user created");
                res.json({
                    ...new_user.toAuthJSON(),
                    "success": true
                });
            })
            .catch(error => { console.log(error) });
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
        User.findOne({ email: user_data.email })
            .then((user) => {
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
            })
            .catch((err) => {
                console.log(err);
                res.json({ success: false, error: err })
            })
    }

})

app.get("/user", (req, res) => {
    let token = req.headers.auth;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        res.json({ "success": true, data: decoded })
    } catch (err) {
        res.json({ "success": false, error: err })
    }
})

// app.get("/auth-endpoint", auth, (request, response) => {
//     response.json({ message: "You are authorized to access me" });
// });

// // free endpoint
// app.get("/free-endpoint", (request, response) => {
//     response.json({ message: "You are free to access me anytime" });
// });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, (port) => console.log(`listening on port ${port}`));

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