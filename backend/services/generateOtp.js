const generateOtp = () => {
    // 6 digit otp
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { generateOtp };
