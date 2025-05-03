/**
 * Deployment preparation script
 * This script prepares the application for deployment to Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('Preparing for deployment...');

// List of required directories
const requiredDirs = [
  'controllers',
  'data',
  'middleware',
  'routes',
  'services',
  'utils'
];

// Ensure each directory exists
requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dir}`);
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch (error) {
      console.error(`Error creating directory ${dir}:`, error);
    }
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Ensure data directory has a products.json file
const dataPath = path.join(__dirname, 'data', 'products.json');
if (!fs.existsSync(dataPath)) {
  console.log('Creating initial products.json file');
  
  // Initial product data
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
  
  try {
    fs.writeFileSync(dataPath, JSON.stringify(initialProducts, null, 2), 'utf8');
    console.log('Created products.json with initial data');
  } catch (error) {
    console.error('Error creating products.json:', error);
  }
}

console.log('Deployment preparation complete!');
console.log('You can now deploy to Vercel with: vercel'); 