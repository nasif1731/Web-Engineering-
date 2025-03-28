const express = require('express');
const router = express.Router();
const Product = require('./product');


router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json({ success: true, message: 'Product added successfully' });
});

router.put('/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true, message: 'Product updated successfully' });
});

// Delete product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Product deleted successfully' });
});

module.exports = router;
