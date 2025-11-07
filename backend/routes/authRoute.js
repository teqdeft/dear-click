const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/userController");
const { uploadProfilePic } = require("../middlewares/imageUploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// user authentication routes
router.get("/test", authController.test);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-email", authController.verifyEmail);
router.post(
  "/complete-profile",
  uploadProfilePic.single("profilePic"),
  authController.createProfile
);
router.post("/set-password", authController.setPassword);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.verifyAndResetPassword);
router.put("/change-password", authMiddleware, authController.changePassword);
router.post("/signin", authController.signIn);

// user profile routes
router.put("/update-profile", uploadProfilePic.single("profilePic"), authMiddleware, authController.addUserDetails);
router.get("/profile-details", authMiddleware, authController.getUserDetails);
router.put(
  "/update-profile-settings",
  authMiddleware,
  authController.UserAccountSetting
);

module.exports = router;
