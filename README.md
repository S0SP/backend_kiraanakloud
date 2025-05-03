# Inventory Management Backend

A simple backend API for an inventory management system that provides product details by barcode.

## Overview

This API accepts a barcode as input and returns product details (name, price, image URL) from a local database. It is designed to be used with a frontend application that scans product barcodes.

## Project Structure

```
├── controllers/       # Request handlers
├── data/              # JSON data files
├── middleware/        # Custom middleware
├── routes/            # API routes
├── services/          # Business logic and data access
├── utils/             # Utility functions
├── index.js           # Main application entry point
├── package.json       # Project dependencies
├── setup.js           # Directory setup script
├── test.js            # Simple test script
├── vercel.json        # Vercel deployment configuration
└── README.md          # Project documentation
```

## Setup

1. Clone the repository:
```
git clone <repository-url>
cd inventory-management-backend
```

2. Install dependencies:
```
npm install
```

3. Run the setup script to ensure all required directories exist:
```
npm run setup
```

4. Start the server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

5. Run tests:
```
npm test
```

## API Endpoints

### Get Product by Barcode

```
GET /api/products/:barcode
```

#### Parameters
- `barcode` - The barcode of the product to retrieve (8-14 digits)

#### Response
Success (200 OK)
```json
{
  "name": "Product Name",
  "price": 99.99,
  "imageUrl": "https://example.com/image.jpg"
}
```

Error (404 Not Found)
```json
{
  "error": "Product not found"
}
```

Error (400 Bad Request)
```json
{
  "error": "Invalid barcode format"
}
```

### Get All Products

```
GET /api/products
```

#### Response
Success (200 OK)
```json
[
  {
    "barcode": "9780201896831",
    "name": "Laptop HP Pavilion",
    "price": 899.99,
    "imageUrl": "https://example.com/images/laptop-hp.jpg"
  },
  ...
]
```

### Process Scanned Barcode

```
POST /api/products/scan
```

#### Request Body
```json
{
  "barcode": "1234567890123",
  "name": "Kurkure",
  "price": 20.00,
  "imageUrl": "https://example.com/images/kurkure.jpg"
}
```

Note: Only `barcode` is required. Other fields will use defaults if missing:
- Default name: "Kurkure"
- Default price: 20.00
- Default imageUrl: A placeholder image URL

#### Response
Success (201 Created - for new products)
```json
{
  "message": "Product created",
  "product": {
    "barcode": "1234567890123",
    "name": "Kurkure",
    "price": 20.00,
    "imageUrl": "https://example.com/images/kurkure.jpg",
    "timestamp": "2023-07-28T15:30:45.123Z"
  }
}
```

Success (200 OK - for updated products)
```json
{
  "message": "Product updated",
  "product": {
    "barcode": "1234567890123",
    "name": "Kurkure",
    "price": 20.00,
    "imageUrl": "https://example.com/images/kurkure.jpg",
    "timestamp": "2023-07-28T15:30:45.123Z"
  }
}
```

Error (400 Bad Request)
```json
{
  "error": "Missing barcode data"
}
```
or
```json
{
  "error": "Invalid barcode format"
}
```

## Example
```
GET /api/products/9780201896831
```

Response:
```json
{
  "name": "Laptop HP Pavilion",
  "price": 899.99,
  "imageUrl": "https://example.com/images/laptop-hp.jpg"
}
```

## Deployment to Vercel

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Vercel CLI](https://vercel.com/cli) installed (optional for direct deployment)

### Deployment Steps

1. Push your code to a GitHub repository

2. Connect the repository to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings (keep defaults unless you need to change them)
   - Click "Deploy"

3. Alternatively, deploy using Vercel CLI:
```
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel
```

4. Access your deployed API:
```
https://your-project-name.vercel.app/api/products
```

### Environment Variables

If needed, set these environment variables in Vercel:
- `NODE_ENV`: Set to "production" 
- `PORT`: Not needed for Vercel (they handle this automatically)

## Further Improvements

- Add authentication for secure API access
- Implement database storage instead of JSON file
- Add product creation, update, and deletion endpoints
- Implement pagination for the get all products endpoint 