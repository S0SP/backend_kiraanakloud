/**
 * Simple test script for the Product API
 * 
 * To run:
 * 1. Start the server: npm start
 * 2. Run this file: node test.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Function to make GET requests
const makeGetRequest = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: jsonData });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

// Run tests
const runTests = async () => {
  console.log('Testing Inventory Management API...');
  
  try {
    // Test 1: Root endpoint
    console.log('\nTest 1: Root endpoint');
    const rootResult = await makeGetRequest(`${BASE_URL}/`);
    console.log(`Status code: ${rootResult.statusCode}`);
    console.log('Response:', rootResult.data);
    
    // Test 2: Get all products
    console.log('\nTest 2: Get all products');
    const productsResult = await makeGetRequest(`${BASE_URL}/api/products`);
    console.log(`Status code: ${productsResult.statusCode}`);
    console.log(`Found ${productsResult.data.length} products`);
    
    // Test 3: Get a valid product by barcode
    const validBarcode = '9780201896831'; // Should match a product in your data
    console.log(`\nTest 3: Get product with valid barcode (${validBarcode})`);
    const validProductResult = await makeGetRequest(`${BASE_URL}/api/products/${validBarcode}`);
    console.log(`Status code: ${validProductResult.statusCode}`);
    console.log('Product found:', validProductResult.data);
    
    // Test 4: Get a product with invalid barcode
    const invalidBarcode = '1111111111'; // Should not match any product
    console.log(`\nTest 4: Get product with invalid barcode (${invalidBarcode})`);
    const invalidProductResult = await makeGetRequest(`${BASE_URL}/api/products/${invalidBarcode}`);
    console.log(`Status code: ${invalidProductResult.statusCode}`);
    console.log('Response:', invalidProductResult.data);
    
    console.log('\nAll tests completed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Run the tests
runTests(); 