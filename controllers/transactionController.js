const {Transaction} = require('../models/Transaction');
const {User} = require('../models/User');
const {personalEnums} = require('../config/personalEnums');

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

//depreceated
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


exports.getFilteredTransactions = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.uid);
    if(!user){
      return res.status(404).json({
        success:false,
        error: "User not found"
      })
    }
    
    const sources = req.body.data.sources
    const categories = req.body.data.categories
    const curr = req.body.data.currpage
    const per = req.body.data.perpage

    const options = {
      path:'transactions', 
    }
    
    

    if(sources && sources.length !== 0) {
      if(!options.match){
        options['match'] = {$and:[]}
      }
      options.match.$and.push({source:{ $in:req.body.data.sources}});
    }

    if(categories && categories.length !== 0) {
      if(!options.match){
        options['match'] = {$and:[]}
      }
      options.match.$and.push({category:{ $in:req.body.data.categories}});
    }

      //transaction count WITH filtering WITHOUT pagination
      const allTransactions = await User.findById(req.params.uid)
                            .populate(options)
      const count = allTransactions.transactions.length

      options['skip'] = curr * per;
     
      if(!(per && per === 0)) {
        options['limit'] = per
      }

      await User.findById(req.params.uid)
      .populate(options)
      .exec((err, val) => {
        return res.status(200).json({
          success:true,
          data: {
            transactions: val.transactions,
            _id: val._id,
            email: val.email,
            username: val.username,
            count: count
          },
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

