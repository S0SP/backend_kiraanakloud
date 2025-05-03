/**
 * Script to ensure that all required directories exist
 * Run this if you're setting up the project for the first time
 */

const fs = require('fs');
const path = require('path');

// List of required directories
const requiredDirs = [
  'controllers',
  'data',
  'middleware',
  'routes',
  'services',
  'utils'
];

console.log('Setting up directory structure...');

// Ensure each directory exists
requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dir}`);
    try {
      fs.mkdirSync(dirPath);
    } catch (error) {
      console.error(`Error creating directory ${dir}:`, error);
    }
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

console.log('Setup complete!'); 