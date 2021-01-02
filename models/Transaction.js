const mongoose = require('mongoose');
const {personalEnums} = require('../config/personalEnums');
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
    default: Date.now()
  },
  currency:{ 
    type: String, 
    enum: personalEnums.currencies.map(obj => obj.code),
    default: "USD",
    required: true
  }, 
  source:{
    type: String,
    enum: personalEnums.sources.map(obj => obj.name),
    required: true,
    default: "OTHER"
  },
  remarks:{
    type:String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  },
  category: {
    type: String,
    enum: personalEnums.categories.map(obj => obj.name),
    required: true,
    default: 'Misc'
  }
  
  

})

exports.Transaction= mongoose.model('Transaction', this.TransactionSchema);