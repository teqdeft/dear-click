const jwt = require("jsonwebtoken");
const { error } = require("../helpers/response");


const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return error(res, "Authorization header missing", null, 401, "AUTH_HEADER_MISSING");
    }

    // Expected format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return error(res, "Token missing", null, 401, "TOKEN_MISSING");
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return error(res, "Invalid or expired token", err, 403, "INVALID_TOKEN");
      }

      // Attach decoded payload to request
      req.user = decoded;
      next();
    });
  } catch (err) {
    return error(res, "Internal server error", err, 500, "SERVER_ERROR");
  }
};

module.exports = authMiddleware;
