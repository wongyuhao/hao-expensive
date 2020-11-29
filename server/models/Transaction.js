const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
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
    default: Date.now
  },
  currency:{ 
    type: String, 
    enum: ['USD', 'MYR'],
    required:true
  },
  bank: {
    type: String,
    enum:['cimb' , 'maybank', ''],
    required:true
  }
  
  

})

module.exports = mongoose.model('Transaction', TransactionSchema);