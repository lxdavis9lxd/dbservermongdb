/**
 * Middleware to check API key for authentication
 */

// The function to check if the request has a valid API key
exports.checkApiKey = (req, res, next) => {
  // Get API key from header
  const apiKey = req.header('x-api-key');
  
  // Get API key from environment variable
  const validApiKey = process.env.API_KEY || 'your-api-key-123456';
  
  // Check if API key exists
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No API key provided.'
    });
  }
  
  // Check if API key is valid
  if (apiKey !== validApiKey) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Invalid API key.'
    });
  }
  
  // If API key is valid, proceed
  next();
};
