/**
 * Middleware to process and filter barcode data from frontend
 */
const filterBarcodeData = (req, res, next) => {
  // Check if we have a body with barcode data
  if (!req.body || !req.body.barcode) {
    return res.status(400).json({ error: 'Missing barcode data' });
  }

  // Set default values for optional fields
  if (!req.body.name) {
    req.body.name = 'Kurkure';
  }

  if (!req.body.price && req.body.price !== 0) {
    req.body.price = 20.00;
  }

  if (!req.body.imageUrl) {
    req.body.imageUrl = 'https://example.com/images/default-product.jpg';
  }

  // Sanitize price to ensure it's a number
  req.body.price = parseFloat(req.body.price);
  
  // Add timestamp
  req.body.timestamp = new Date().toISOString();

  console.log('Filtered barcode data:', req.body);
  next();
};

module.exports = filterBarcodeData; 