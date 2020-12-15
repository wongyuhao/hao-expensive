const express = require('express');
const router = express.Router();
const {getAllTransactions,getUserTransactions, addUserTransaction, deleteTransactions} = require('../controllers/transactionController')

router
  .route('/')
  .get(getAllTransactions);

router
  .route('/:uid')
  .get(getUserTransactions)
  .post(addUserTransaction);

router
  .route('/:id')
  .delete(deleteTransactions);
  
module.exports = router;