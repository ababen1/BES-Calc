const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config()
const app = express();

app.use(express.json())

mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        require('./models/Calculator');
        require('./models/User');
        require('./models/SavedCalculation');
        console.log("conntected to db");
        populate()
    })
    .catch(console.error);

app.listen(5000, () => console.log(`listening on port 5000`));

function populate() {
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
}