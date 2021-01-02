const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const transactions = require('./routes/transactions.js');
const users = require('./routes/users.js');
const {defaultEnums} = require('./config/defaultEnums')
const {personalEnums} = require('./config/personalEnums')
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/users', users);
app.use('/api/v1/transactions', transactions);
app.post('/api/v1/enums', (req, res) => {
  try {
    (req.body.username ==='bye@gmail.com') 
    ?
     res.json(personalEnums)
    :
    res.json(defaultEnums)
  } catch (error) {
    console.error(error.message)
  }
})



if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server: ${process.env.NODE_ENV} mode - port ${PORT}`));