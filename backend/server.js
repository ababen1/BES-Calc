const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const env = require('dotenv').config()
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };
app.use(cors(corsOptions));

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
    })
    .catch(console.error);

    
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
  });

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