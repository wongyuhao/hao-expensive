const express = require('express');
const router = express.Router();
const {getUser, getUsers, deleteUser, loginUser, registerUser, tokenIsValid} = require('../controllers/userController');
const auth = require('./auth');

router
  .route('/register')
  .post(registerUser);

router
  .route('/login')
  .post(loginUser);

router
  .route('/tokenIsValid')
  .post(tokenIsValid);

router
  .route('/get/all')
  .get(getUsers)

router.get('/get', auth, getUser);
router.delete('/:id', auth, deleteUser);
  



module.exports = router;