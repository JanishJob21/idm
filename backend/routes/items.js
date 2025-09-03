const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// @desc    Get all items
// @route   GET /api/items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    res.json(item);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @desc    Create an item
// @route   POST /api/items
// @access  Public
router.post('/', async (req, res) => {
  console.log('POST /api/items - Request body:', JSON.stringify(req.body, null, 2));
  try {
    console.log('Request body:', req.body);
    const { name, price, quantity = 1 } = req.body;
    
    const newItem = new Item({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity) || 1
    });
    
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Public
router.put('/:id', async (req, res) => {
  console.log(`PUT /api/items/${req.params.id} - Request body:`, JSON.stringify(req.body, null, 2));
  try {
    const { name, price, quantity } = req.body;
    
    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (price) updateFields.price = parseFloat(price);
    if (quantity) updateFields.quantity = parseInt(quantity) || 1;
    
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    res.json(updatedItem);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    await Item.deleteOne({ _id: req.params.id });
    
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;
