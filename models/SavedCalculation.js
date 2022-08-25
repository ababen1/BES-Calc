var mongoose = require('mongoose');

var SavedCalculationSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      customer: String,
      facility: String,
      remakers: String,
      date: Date,
      calculations: mongoose.Schema.Types.Mixed
    });

    
mongoose.model("SavedCalculation", SavedCalculationSchema);
