const express = require("express");
const router = express.Router();
const { uploadPostMedia } = require("../middlewares/imageUploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const battleController = require("../controllers/battle/reelController");

const { validateReel } = require("../helpers/validators");

// battle reel routes

// create battle post
router.post(
  "/interest/battle",
  authMiddleware,
  uploadPostMedia.single("media"),
  // validateReel,
  battleController.createBattle
);

// fetch battle posts by interest
router.get("/interest", authMiddleware, battleController.fetchBattlePosts);
router.get(
  "/interest/:interestId",
  authMiddleware,
  battleController.getReelByCategory
);

module.exports = router;
