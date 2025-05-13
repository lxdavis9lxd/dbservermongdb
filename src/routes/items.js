const express = require('express');
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

// Import auth middleware
const { checkApiKey } = require('../middleware/auth');

// Apply API key authentication to all routes
router.use(checkApiKey);

// Item routes
router.route('/')
  .get(getItems)
  .post(createItem);

router.route('/:id')
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
