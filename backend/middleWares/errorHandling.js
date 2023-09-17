// Define a custom error class for API errors
class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  // Error handling middleware for handling API errors
  function handleApiErrors(err, req, res, next) {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      // If it's not an ApiError, treat it as a generic 500 internal server error
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  
  module.exports = {
    ApiError,
    handleApiErrors,
  };
  