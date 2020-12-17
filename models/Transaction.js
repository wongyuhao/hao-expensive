const mongoose = require('mongoose');
const {enums} = require('../config/enums');
exports.TransactionSchema = new mongoose.Schema({
  text:{
    type: String,
    trim: true,
    required:true
  },
  amount: {
    type: Number,
    required: true 
  },
  createdAt: {
    type: Date,
    required: true, 
    default: Date.now
  },
  currency:{ 
    type: String, 
    enum: enums.currencies.map(obj => obj.code),
    default: "",
    required: true
  }, 
  source:{
    type: String,
    enum: enums.sources.map(obj => obj.name),
    required: true,
    default: ""
  },
  remarks:{
    type:String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  }
  
  

})

exports.Transaction= mongoose.model('Transaction', this.TransactionSchema);