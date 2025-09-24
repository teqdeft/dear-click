function success(res, data = null, status = 200, message = "Success") {
  return res.status(status).json({
    success: true, // Indicates a successful response
    data, // Optional data to send in the response
    message, // A message describing the success (default is 'Success')
  });
}

// Helper function for error responsess
function error(
  res,
  message = "An error occurred",
  metadata = null,
  status = 500,
  errorCode = "GENERIC_ERROR"
) {
  return res.status(status).json({
    success: false, // Indicates an error response
    error: {
      message, // A message describing the error (default is 'An error occurred')
      code: errorCode, // A custom error code (default is 'GENERIC_ERROR')
      metadata, // Additional metadata related to the error (default is null)s
    },
  });
}
module.exports = { success, error };
