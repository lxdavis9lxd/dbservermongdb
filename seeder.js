const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./src/models/Item');

// Load environment variables
dotenv.config();

// Sample data
const itemsData = [
  {
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM and SSD',
    category: 'Electronics',
    price: 999.99,
    inStock: true,
    quantity: 15
  },
  {
    name: 'Smartphone',
    description: 'Latest model with dual camera',
    category: 'Electronics',
    price: 699.99,
    inStock: true,
    quantity: 25
  },
  {
    name: 'Headphones',
    description: 'Noise-cancelling wireless headphones',
    category: 'Electronics',
    price: 199.99,
    inStock: true,
    quantity: 30
  },
  {
    name: 'Programming Book',
    description: 'Learn programming from scratch',
    category: 'Books',
    price: 29.99,
    inStock: true,
    quantity: 12
  },
  {
    name: 'T-shirt',
    description: 'Cotton t-shirt, various colors',
    category: 'Clothing',
    price: 19.99,
    inStock: true,
    quantity: 50
  }
];

// Connect to MongoDB
mongoose.connect('mongodb+srv://lxdavis9lxd:Mynameissora99@cluster0.kjlacwu.mongodb.net/mongoDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding...'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Seed data
const seedData = async () => {
  try {
    // Delete existing data
    await Item.deleteMany({});
    console.log('All existing items deleted');

    // Insert new data
    const items = await Item.insertMany(itemsData);
    console.log(`${items.length} items inserted`);

    // Disconnect from database
    mongoose.disconnect();
    console.log('Database seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

// Run the seeding
seedData();
