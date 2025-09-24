const jwt = require("jsonwebtoken");

// Function to generate token
const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = { generateJwtToken };
