const mongoose = require('mongoose');

exports.UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 5},
  username: String,
  transactions: [{type: mongoose.Schema.Types.ObjectId, ref:'Transaction'}],
})


exports.User = mongoose.model('User', this.UserSchema);



