 
const express = require('express');
const flash = require('express-flash')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const nocache = require('nocache')
require('dotenv').config();
 
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
 
const app = express();

app.use(nocache())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

 
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//PORT
const PORT = process.env.PORT || 3000;

//connecting database
mongoose.connect('mongodb://127.0.0.1:27017/first_project')

 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())





app.use('/admin', adminRouter);
app.use('/', usersRouter);



app.listen(PORT, () => {
  console.log("working");
})




// module.exports = app;
