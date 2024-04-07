const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productController = require('./controller/product');
const userController = require('./controller/user');
const commentController = require('./controller/comment');
const cartController = require('./controller/cart');
const orderController = require('./controller/order');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

const dbUrl =
  'mongodb+srv://majeed:dJxtdMa6Qwsp25r4@cluster0.phgy9ol.mongodb.net/majeed-assignment4?retryWrites=true&w=majority&appName=Cluster0';

// Mongoose Connect
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('MongoDB connected - Database:majeed-assignment4');
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

// User Routes
app.post('/api/v1/users', userController.createUser);
app.get('/api/v1/users', userController.getUsers);
app.get('/api/v1/users/:id', userController.getUserById);
app.put('/api/v1/users/:id', userController.updateUser);
app.delete('/api/v1/users/:id', userController.deleteUser);

// Comment Routes
app.post('/api/v1/comments', commentController.createComment);
app.get('/api/v1/comments', commentController.getComments);
app.get('/api/v1/comments/:id', commentController.getCommentById);
app.put('/api/v1/comments/:id', commentController.updateComment);
app.delete('/api/v1/comments/:id', commentController.deleteComment);

// Comment Routes
app.post('/api/v1/carts', cartController.createCart);
app.get('/api/v1/carts', cartController.getAllCart);
app.get('/api/v1/carts/:id', cartController.getCartById);
app.put('/api/v1/carts/:id', cartController.updateCartById);
app.delete('/api/v1/carts/:id', cartController.deleteCartById);

// Order Routes
app.post('/api/v1/orders', orderController.createOrder);
app.get('/api/v1/orders', orderController.getOrders);
app.get('/api/v1/orders/:id', orderController.getOrderById);
app.put('/api/v1/orders/:id', orderController.updateOrder);
app.delete('/api/v1/orders/:id', orderController.deleteOrder);

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
