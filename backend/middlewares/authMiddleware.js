const jwt = require("jsonwebtoken");
const db = require("../db/db");
const { error } = require("../helpers/response");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return error(
        res,
        "Authorization header missing",
        null,
        401,
        "AUTH_HEADER_MISSING"
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return error(res, "Token missing", null, 401, "TOKEN_MISSING");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db("users").where("id", decoded.id).first();
    if (!user) {
      return error(res, "User not found", null, 401, "USER_NOT_FOUND");
    }

    req.user = user;
    // console.log("Authenticated User:", req.user);

    next();
  } catch (err) {
    console.error("Auth Error:", err);
    return error(
      res,
      "Invalid or expired token",
      err.message,
      403,
      "INVALID_TOKEN"
    );
  }
};

module.exports = authMiddleware;
