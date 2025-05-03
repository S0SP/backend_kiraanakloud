const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const filterBarcodeData = require('../middleware/barcodeFilter');

// Get all products (optional)
router.get('/', productController.getAllProducts);

// Get product by barcode
router.get('/:barcode', productController.getProductByBarcode);

// Process scanned barcode data
router.post('/scan', filterBarcodeData, productController.processBarcodeData);

module.exports = router;