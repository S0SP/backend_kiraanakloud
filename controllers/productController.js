const productService = require('../services/productService');
const { isValidBarcode } = require('../utils/barcodeValidator');

// Get product by barcode
const getProductByBarcode = (req, res) => {
  const { barcode } = req.params;
  
  // Validate barcode format
  if (!isValidBarcode(barcode)) {
    return res.status(400).json({ error: 'Invalid barcode format' });
  }
  
  // Find product with matching barcode
  const product = productService.findProductByBarcode(barcode);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Return product details (name, price, imageUrl)
  return res.json({
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl
  });
};

// Get all products
const getAllProducts = (req, res) => {
  const products = productService.getAllProducts();
  
  const productDetails = products.map(p => ({
    barcode: p.barcode,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl
  }));
  
  res.json(productDetails);
};

// Process scanned barcode and save product
const processBarcodeData = (req, res) => {
  const productData = req.body;
  
  // Validate barcode format
  if (!isValidBarcode(productData.barcode)) {
    return res.status(400).json({ error: 'Invalid barcode format' });
  }
  
  // Save or update product
  const result = productService.saveProduct(productData);
  
  if (!result.success) {
    return res.status(500).json({ error: 'Failed to save product data' });
  }
  
  return res.status(result.isNew ? 201 : 200).json({
    message: result.isNew ? 'Product created' : 'Product updated',
    product: result.product
  });
};

module.exports = {
  getProductByBarcode,
  getAllProducts,
  processBarcodeData
}; 