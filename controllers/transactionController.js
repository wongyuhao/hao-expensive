const {Transaction} = require('../models/Transaction');
const {User} = require('../models/User');


exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success:true,
      count:transactions.length,
      data:transactions
    });
  } catch (err) {
    return res.status(500).json({
      success:false,
      error: 'Server '
    })
  }
}

exports.getUserTransactions = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.uid);
    if(!user){
      return res.status(404).json({
        success:false,
        error: "User not found"
      })
    }

    await User.findById(req.params.uid)
              .populate('transactions')
              .exec((err, transactions) => {
                return res.status(200).json({
                  success:true,
                  data: transactions
                });
              });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success:false,
      error: 'Server '
    })
  }
}

exports.addUserTransaction = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.uid);
  

    if(!user){
      return res.status(404).json({
        success:false,
        error: "User not found"
      })
    }

    const transaction = await Transaction.create({...req.body, user: req.params.uid});

    User.findOneAndUpdate(
      {_id: req.params.uid},
      {$push:{transactions: transaction._id}})
      .exec();

    return res.status(201).json({
      sucess:true,
      data: {transaction: transaction, user: user.username}
    })
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        sucess:false,
        error: messages
      })
    }else{
      return res.status(500).json({
        success:false,
        error: 'Server '
      })
    }
  }
}

exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction){
      return res.status(404).json({
        success:false,
        error: "No transaction found"
      })
    }
    User.findOneAndUpdate(
      {_id: transaction.user},
      {$pull:{transactions: req.params.id}})
      .exec();
    await transaction.remove();

    return res.status(200).json({
      success: true,
      data:{}
    })
  } catch (err) {
    return res.status(500).json({
      success:false,
      error: 'Server '
    })
  }
}