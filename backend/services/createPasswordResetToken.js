const crypto = require("crypto");

const createResetToken = () => {
  // 1. Generate secure random token (raw)
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2. Hash token for DB (never store raw)
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return resetTokenHash;
};

module.exports = { createResetToken };
