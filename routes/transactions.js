const express = require('express');
const router = express.Router();
const {getAllTransactions,getUserTransactions,getFilteredTransactions, addUserTransaction, deleteTransactions, getAllEnums} = require('../controllers/transactionController')

router
  .route('/')
  .get(getAllTransactions);

router
  .route('/:uid')
  .get(getUserTransactions)
  .post(addUserTransaction);

router
  .route('/:uid/filter')
  .post(getFilteredTransactions);
router
  .route('/:id')
  .delete(deleteTransactions);

module.exports = router;