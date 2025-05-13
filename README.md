# MongoDB REST API

A simple Express.js server that connects to MongoDB Atlas and provides CRUD REST APIs with API key authentication.

## Features

- Connect to MongoDB Atlas
- CRUD operations for items
- RESTful API design
- API key authentication
- Advanced filtering, sorting, and pagination
- Error handling

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd dbservermongdb
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
API_KEY=your-api-key-123456
```

## Running the Server

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

### Seed the database with sample data
```bash
npm run seed
```

## API Endpoints

All endpoints require the `x-api-key` header with a valid API key.

### Items

- `GET /api/items` - Retrieve all items
- `GET /api/items/:id` - Retrieve a specific item by ID
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an existing item
- `DELETE /api/items/:id` - Delete an item

## Query Parameters (for GET /api/items)

- **Filtering**: `?category=Electronics&price[gte]=100&price[lt]=1000`
- **Sorting**: `?sort=price` (ascending) or `?sort=-price` (descending)
- **Field Selection**: `?select=name,price,category`
- **Pagination**: `?page=2&limit=10`

## Example Usage

### Creating an item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-123456" \
  -d '{"name": "Item Name", "description": "Item Description", "category": "Electronics", "price": 99.99, "inStock": true, "quantity": 10}'
```

### Getting all items with filtering and pagination
```bash
curl -X GET "http://localhost:3000/api/items?category=Electronics&price[gte]=100&page=1&limit=5" \
  -H "x-api-key: your-api-key-123456"
```

### Getting a specific item
```bash
curl -X GET http://localhost:3000/api/items/your-item-id \
  -H "x-api-key: your-api-key-123456"
```

### Updating an item
```bash
curl -X PUT http://localhost:3000/api/items/your-item-id \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-123456" \
  -d '{"name": "Updated Name", "price": 129.99}'
```

### Deleting an item
```bash
curl -X DELETE http://localhost:3000/api/items/your-item-id \
  -H "x-api-key: your-api-key-123456"
```

### Creating an item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Item Name", "description": "Item Description", "category": "Electronics", "price": 99.99, "inStock": true, "quantity": 10}'
```

### Getting all items
```bash
curl -X GET http://localhost:3000/api/items
```

### Getting a specific item
```bash
curl -X GET http://localhost:3000/api/items/your-item-id
```

### Updating an item
```bash
curl -X PUT http://localhost:3000/api/items/your-item-id \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "price": 129.99}'
```

### Deleting an item
```bash
curl -X DELETE http://localhost:3000/api/items/your-item-id
```
