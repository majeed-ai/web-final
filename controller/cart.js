const Cart = require('../schema/cartSchema');

// Create a new cart
const createCart = async (req, res) => {
  try {
    const { products, user } = req.body;
    const cart = await Cart.create({
      products,
      user,
    });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: `Failed to create cart, ${error?.message}` });
  }
};

// Get all cart
const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get carts' });
  }
};

// Get a cart by ID
const getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cart' });
  }
};

// Update a cart by ID
const updateCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, user } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      id,
      {
        products,
        user,
      },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Delete a cart by ID
const deleteCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};

module.exports = {
  getAllCart,
  createCart,
  getCartById,
  updateCartById,
  deleteCartById,
};
