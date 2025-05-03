const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/products');

// Import middleware
const requestLogger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/products', productRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Inventory Management API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Handle Vercel serverless function health check
app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
  });
});

// Create directory structure if it doesn't exist (for Vercel deployment)
const fs = require('fs');
const requiredDirs = ['data', 'controllers', 'services', 'middleware', 'routes', 'utils'];
requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For Vercel
module.exports = app; 