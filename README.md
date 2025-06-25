
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19846427&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

# 🛍️ Product API – Express.js RESTful API

This is a RESTful API built with **Express.js** that allows you to manage a list of products. It includes CRUD operations, middleware for logging and authentication, and advanced features like search, pagination, and category filtering.

## 🧰 Requirements

- Node.js (v18 or higher)
- npm
- Postman (or curl, Insomnia, etc.)

## 🚀 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Denis-Mwanzia.git
cd week-2-express-js-assignment-Denis-Mwanzia

### 2. Install Dependencies

npm install

### 3. Run the Server

npm start

Server will start at: `http://localhost:3000`

## 🔐 API Authentication

All requests require an API key passed in the header:

| Header       | Value          |
|--------------|----------------|
| `x-api-key`  | `Yousecurekey` |

## 🧪 Using the API with Postman

### Step 1: Set Up Postman Environment

- Create a new environment in Postman with:
  - `base_url = http://localhost:3000`
  - `x-api-key = Yousecurekey`

### Step 2: Set Headers in Requests

For **all** requests, add this to your headers:

Key: x-api-key
Value: Yousecurekey

## 📘 API Endpoints

### 1. GET `/api/products`

Get all products.  
**Supports query params:**
- `category` (e.g., `?category=electronics`)
- `page` and `limit` for pagination

### 2. GET `/api/products/:id`

Get a single product by ID.

### 3. POST `/api/products`

Create a new product.

**Body (JSON):**

---
```go
{
  "name": "Tablet",
  "description": "High-end tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```
---

### 4. PUT `/api/products/:id`

Update a product by ID.

**Body (JSON):**

---
```go
{
  "name": "Updated Tablet",
  "description": "Updated description",
  "price": 350,
  "category": "electronics",
  "inStock": false
}
```
---

### 5. DELETE `/api/products/:id`

Delete a product by ID.

### 6. GET `/api/products/search?name=query`

Search for products by name.

### 7. GET `/api/products/stats`

Get a count of products by category.

## 🧾 Example Postman Request Setup

**GET all products**

- Method: GET
- URL: `{{base_url}}/api/products`
- Headers:
  - `x-api-key: {{x-api-key}}`

## ❗ Error Responses

| Code | Message           | Cause                        |
|------|-------------------|------------------------------|
| 400  | Invalid product   | Missing/invalid input        |
| 401  | Unauthorized      | Missing or wrong API key     |
| 404  | Product not found | ID not in database           |
| 500  | Server error      | Internal app failure         |
