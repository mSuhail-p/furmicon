
require('dotenv').config();
const express = require('express');
const flash = require('express-flash')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const nocache = require('nocache')

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())



app.use('/admin', adminRouter);
app.use('/', usersRouter);
app.get("*", (req, res) => {
  res.send(
    '<style>body{background: black;}</style><h1 style="color: white; font-family: Courier, monospace; text-align: center; margin-top: 20%;">404 Page not found<span style="color: red";> !!!</span></h1>'
  );
});


// MongoDB connection with proper error handling
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_CONNECT) {
      console.error('ERROR: MONGODB_CONNECT environment variable is not set.');
      console.error('Please add a valid MongoDB connection string to your .env file.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log('MongoDB connected successfully');

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);

    if (error.message.includes('bad auth') || error.message.includes('authentication failed')) {
      console.error('');
      console.error('=== AUTHENTICATION ERROR ===');
      console.error('Your MongoDB Atlas credentials are invalid or expired.');
      console.error('To fix this:');
      console.error('  1. Go to https://cloud.mongodb.com');
      console.error('  2. Navigate to Database Access');
      console.error('  3. Edit or recreate your database user');
      console.error('  4. Update the MONGODB_CONNECT value in your .env file');
      console.error('============================');
    }

    process.exit(1);
  }
};

// MongoDB connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

// Connect to MongoDB first, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
