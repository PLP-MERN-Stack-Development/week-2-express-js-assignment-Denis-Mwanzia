// server.js - Complete Express server for Week 2 assignment

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ==========================
// Middleware Setup
// ==========================

// JSON parser
app.use(bodyParser.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication Middleware
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== 'Yousecurekey') {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }
  next();
});

// ==========================
// Sample In-Memory Database
// ==========================
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false,
  },
];

// ==========================
// Routes
// ==========================

// Root route
app.get('/', (req, res) => {
  res.send(
    'Welcome to the Product API! Go to /api/products to see all products.'
  );
});

// GET /api/products - Get all products (with filtering, pagination)
app.get('/api/products', (req, res) => {
  let results = [...products];
  const { category, page = 1, limit = 10 } = req.query;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + Number(limit));

  res.json({ results: paginated, total: results.length });
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (
    !name ||
    !description ||
    typeof price !== 'number' ||
    !category ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, description, price, category, inStock } = req.body;

  if (
    !name ||
    !description ||
    typeof price !== 'number' ||
    !category ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  products[index] = {
    ...products[index],
    name,
    description,
    price,
    category,
    inStock,
  };

  res.json(products[index]);
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

// GET /api/products/search?name=query - Search by name
app.get('/api/products/search', (req, res) => {
  const { name } = req.query;
  if (!name)
    return res.status(400).json({ message: 'Missing search parameter: name' });

  const matches = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json({ results: matches, total: matches.length });
});

// GET /api/products/stats - Get product stats by category
app.get('/api/products/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

// ==========================
// Global Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for testing
module.exports = app;
