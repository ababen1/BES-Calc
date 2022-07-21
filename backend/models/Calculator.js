var mongoose = require('mongoose');

var CalculatorSchema = new mongoose.Schema(
    {
        description: String,
        powerKW: mongoose.Schema.Types.Mixed,
        cable: {
            type: String, 
            enum: ['al', 'cu']
        },
        wire: {
            type: String, 
            enum: ['single', '3wire']
        },
        ampacity: Number, 
        reserve: Number,
        imax: Number,
        smm2: Number, // TODO: find a better name for this 
    }
);

mongoose.model("Calculator", CalculatorSchema);