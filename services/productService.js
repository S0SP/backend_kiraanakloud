const path = require('path');
const fs = require('fs');

// Cache for products data to avoid repeated file reads
let productsCache = null;

// Initial product data (used as fallback for read-only filesystems)
const initialProducts = [
  {
    "barcode": "9780201896831",
    "name": "Laptop HP Pavilion",
    "price": 899.99,
    "imageUrl": "https://example.com/images/laptop-hp.jpg"
  },
  {
    "barcode": "5901234123457",
    "name": "Smartphone Samsung Galaxy S21",
    "price": 799.99,
    "imageUrl": "https://example.com/images/samsung-s21.jpg"
  },
  {
    "barcode": "4000000000007",
    "name": "Wireless Headphones Sony",
    "price": 199.99,
    "imageUrl": "https://example.com/images/sony-headphones.jpg"
  }
];

// Create data directory if it doesn't exist
const ensureDataDirectory = () => {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
      return true;
    } catch (error) {
      console.error('Error creating data directory:', error);
      return false;
    }
  }
  return true;
};

// Load products data
const loadProductsData = () => {
  try {
    // Return cached data if available
    if (productsCache) {
      return productsCache;
    }
    
    const dataPath = path.join(__dirname, '..', 'data', 'products.json');
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      // Try to create the file with initial data
      try {
        ensureDataDirectory();
        fs.writeFileSync(dataPath, JSON.stringify(initialProducts, null, 2), 'utf8');
        productsCache = initialProducts;
        return initialProducts;
      } catch (writeError) {
        console.error('Error creating products data file:', writeError);
        // If can't create file, use in-memory data
        productsCache = initialProducts;
        return initialProducts;
      }
    }
    
    const fileData = fs.readFileSync(dataPath, 'utf8');
    
    // Parse JSON data
    try {
      productsCache = JSON.parse(fileData);
      return productsCache;
    } catch (parseError) {
      console.error('Error parsing products data:', parseError);
      // If parsing fails, use in-memory data
      productsCache = initialProducts;
      return initialProducts;
    }
  } catch (error) {
    console.error('Error loading products data:', error);
    // If all fails, use in-memory data
    productsCache = initialProducts;
    return initialProducts;
  }
};

// Save products data to file
const saveProductsData = (products) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'products.json');
    
    // Ensure data directory exists
    if (!ensureDataDirectory()) {
      // If can't create directory, just update cache
      productsCache = products;
      return true;
    }
    
    // Try to write to file
    try {
      fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf8');
      // Update cache
      productsCache = products;
      return true;
    } catch (writeError) {
      console.error('Error writing products data:', writeError);
      // If can't write, just update cache
      productsCache = products;
      return true; // Still return true to not break functionality
    }
  } catch (error) {
    console.error('Error saving products data:', error);
    // Update cache even if file operations fail
    productsCache = products;
    return true; // Still return true to not break functionality
  }
};

// Get all products
const getAllProducts = () => {
  return loadProductsData();
};

// Find product by barcode
const findProductByBarcode = (barcode) => {
  const products = loadProductsData();
  return products.find(product => product.barcode === barcode);
};

// Save or update product
const saveProduct = (productData) => {
  const products = loadProductsData();
  const { barcode } = productData;
  
  // Check if product already exists
  const existingProductIndex = products.findIndex(p => p.barcode === barcode);
  
  if (existingProductIndex !== -1) {
    // Update existing product
    products[existingProductIndex] = {
      ...products[existingProductIndex],
      ...productData
    };
  } else {
    // Add new product
    products.push(productData);
  }
  
  // Save to file
  const success = saveProductsData(products);
  
  return {
    success,
    product: productData,
    isNew: existingProductIndex === -1
  };
};

// Refresh the cache (useful for testing or when the data file is updated)
const refreshProductsCache = () => {
  productsCache = null;
  return loadProductsData();
};

module.exports = {
  getAllProducts,
  findProductByBarcode,
  saveProduct,
  refreshProductsCache
}; 