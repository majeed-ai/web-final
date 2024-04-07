// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Mongoose Connect
mongoose
  .connect(
    'mongodb+srv://majeed:dJxtdMa6Qwsp25r4@cluster0.fxprjh6.mongodb.net/majeed-assignment4?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Majeed Assignment 4!');
});

// Start the server
app.listen(3000, () => {
  console.log(
    'Majeed Assignment 4 Server started on port http://localhost:3000/'
  );
});
