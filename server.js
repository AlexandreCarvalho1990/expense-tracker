const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors= require ('colors');
const morgan = require ('morgan');
const connectDB = require('./config/db');


dotenv.config({path: './config/config.env'});
// Make the connection to DB, in this case MongoDB with mongoose
connectDB();
const transactions = require('./routes/transactions.js');
const app = express();
const PORT = process.env.PORT || 5000;

//MiddleWare body parser to get our information from the
//front End
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routing system 
app.use('/api/v0/transactions',transactions);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build',
    'index.html')));
}


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} running on port ${PORT} `.green.bold));