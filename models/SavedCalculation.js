var mongoose = require('mongoose');

var SavedCalculationSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
      customer: String,
      facility: String,
      remakers: String,
      calculators: [{type: mongoose.Schema.Types.ObjectId, ref: "Calculator"}],
    });

    
mongoose.model("SavedCalculation", SavedCalculationSchema);
