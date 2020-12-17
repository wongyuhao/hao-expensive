const mongoose = require('mongoose');
const {enums:{currencies, sources}} = require('../config/enums');
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
    enum: currencies,
    default: currencies[currencies.length - 1],
    required: true
  }, 
  source:{
    type: String,
    enum: sources,
    required: true,
    default: sources[sources.length - 1]
  },
  remarks:{
    type:String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  }
  
  

})

exports.Transaction= mongoose.model('Transaction', this.TransactionSchema);