const express = require("express");
const router = express.Router();
const { uploadPostMedia } = require("../middlewares/imageUploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { toggleLike } = require("../controllers/post/likes/likeController");
const commentController = require("../controllers/post/comments/commentController");
const battleController = require("../controllers/battle/reelController");
const { validateReel } = require("../helpers/validators");

router.post(
  "/interest/battle",
  authMiddleware,
  uploadPostMedia.single("media"),
  validateReel,
  battleController.createBattle
);

// like post
router.post("/:postId/toggle-like", authMiddleware, toggleLike);
router.post(
  "/:postId/create-comment",
  authMiddleware,
  commentController.createComment
);

// fetch battle posts by interest
router.get("/interest", authMiddleware, battleController.fetchBattlePosts);
router.get(
  "/interest/:interestId",
  authMiddleware,
  battleController.getReelByCategory
);

module.exports = router;
