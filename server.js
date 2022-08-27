const path = require('path');
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('./models/Calculator');
require('./models/User');
require('./models/SavedCalculation');

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));

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

app.use(require('./routes/api/Signup'));
app.use(require('./routes/api/Login'));
app.use(require('./routes/api/Calculations'))


// simple route
app.get("/", (req, res) => {
    console.log(req);
    res.json({ message: "Welcome" });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, (port) => console.log(`listening on port ${port}`));

