var mongoose = require('mongoose');
var crypto = require("crypto");

var UserSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],

      },
      username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      },
      hash: String,
      salt: String,
      savedCalculations: [{type: mongoose.Schema.Types.ObjectId, ref: "SavedCalculation"}]
    });

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString('hex'); 
}

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString('hex');
  return this.hash == hash;
} 

mongoose.model("User", UserSchema);

    