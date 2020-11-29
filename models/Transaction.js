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
    required: true, 
    default: Date.now
  },
  currency:{ 
    type: String, 
    enum: ['USD', 'MYR'],
    required: true
  }, 
  source:{
    type: String,
    enum: ['CIMB', 'MAYBANK', 'OTHER'],
    required: true,
    default: "other"
  },
  remarks:{
    type:String
  }
  
  

})

module.exports = mongoose.model('Transaction', TransactionSchema);