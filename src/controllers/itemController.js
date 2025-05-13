const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
exports.getItems = async (req, res, next) => {
  try {
    // Build query
    let query;
    
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Finding resource
    query = Item.find(JSON.parse(queryStr));
    
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Item.countDocuments(JSON.parse(queryStr));
    
    query = query.skip(startIndex).limit(limit);
    
    // Executing query
    const items = await query;
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: items.length,
      pagination,
      total,
      data: items
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (err) {
    // Handle case where ID format is invalid
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID format'
      });
    }
    next(err);
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Public
exports.createItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    
    res.status(201).json({
      success: true,
      data: item
    });
  } catch (err) {
    // Handle validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        errors: messages
      });
    }
    next(err);
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Public
exports.updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (err) {
    // Handle validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        errors: messages
      });
    }
    // Handle case where ID format is invalid
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID format'
      });
    }
    next(err);
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Public
exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    // Handle case where ID format is invalid
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID format'
      });
    }
    next(err);
  }
};
