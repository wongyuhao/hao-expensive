const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path  = require ('path')
const transactions = require('./routes/transactions.js')
dotenv.config({path: './config/config.env'});

connectDB();
const app = express();
app.use(express.json());

app.use('/api/v1/transactions', transactions)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'))
  })
}
app.listen(PORT, console.log(`server: ${process.env.NODE_ENV} mode - port ${PORT}`));