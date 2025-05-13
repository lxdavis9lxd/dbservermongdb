const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const itemRoutes = require('./src/routes/items');

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://lxdavis9lxd:Mynameissora99@cluster0.kjlacwu.mongodb.net/mongoDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the MongoDB REST API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: err.message
  });
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
