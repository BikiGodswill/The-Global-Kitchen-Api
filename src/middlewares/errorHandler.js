const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected server error occurred";

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    // Collect all validation messages into a single readable string
    message = Object.values(err.errors)
      .map((field) => field.message)
      .join(". ");
  }

  // Mongoose CastError
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = `Invalid ID format: "${err.value}"`;
  }

  // MongoDB duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue).join(", ");
    message = `A recipe with this ${duplicateField} already exists`;
  }

  // In development. attach stack trace for easier debugging
  const response = {
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  console.error(`[Error ${statusCode}] ${message}`);

  return res.status(statusCode).json(response);
};

module.exports = globalErrorHandler;
