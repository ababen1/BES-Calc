var mongoose = require('mongoose');

var calculatorSchema = new mongoose.Schema(
    {
        description: String,
        powerKW: {
            type: Number,
            validate: {
                validator: (value) => { return value in [15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250, 280, 315, 355]},
                message: "Invalid PowerKW"
            },
        },
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
calculatorSchema.path('powerKW').options.enum;
mongoose.model("Calculator", calculatorSchema);