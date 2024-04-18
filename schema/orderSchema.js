const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  creditCardNumber: { type: Number, required: true },
  creditCardExpiry: { type: Number, required: true },
  creditCardCvv: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
