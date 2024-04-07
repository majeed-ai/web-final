// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productController = require('./controller/product');

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

// Product routes
app.post('/api/v1/products', productController.createProduct);
app.get('/api/v1/products', productController.getAllProducts);
app.get('/api/v1/products/:id', productController.getProductById);
app.put('/api/v1/products/:id', productController.updateProduct);
app.delete('/api/v1/products/:id', productController.deleteProduct);

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
