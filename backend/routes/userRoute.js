const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const followsController = require("../controllers/follows/follows");
const interestController = require("../controllers/interest/interest");
const storyController = require("../controllers/stories/storyController");
const { uploadStoryMedia } = require("../middlewares/imageUploadMiddleware");

// follow routes
// Follow / Unfollow / Request / Cancel
router.post("/:userId/follows", authMiddleware, followsController.toggleFollow);
// Accept / Reject a follow request
router.post(
  "/respond/:requestId",
  authMiddleware,
  followsController.respondToFollowRequest
);

// user interest routes
router.get("/get-interest", interestController.getInterests);
router.post(
  "/post-interest/:id",
  authMiddleware,
  interestController.createUserInterests
);

// user stories
router.post(
  "/upload-story",
  uploadStoryMedia.single("stories"),
  authMiddleware,
  storyController.uploadStory
);
module.exports = router;
