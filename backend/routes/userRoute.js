const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const followsController = require("../controllers/follows/follows");
const interestController = require("../controllers/interest/interest");
const storyController = require("../controllers/stories/storyController");
const highlightController = require("../controllers/highlight/highlightController");
const { uploadStoryMedia } = require("../middlewares/imageUploadMiddleware");
const authController = require("../controllers/auth/userController");

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

router.get("/get-story", authMiddleware, storyController.getStory);
// user hide for stories
router.post("/hide-story/:storyId", authMiddleware, storyController.storyHide);

// user close friend list for stories
router.post(
  "/close-friend-story/:storyId",
  authMiddleware,
  storyController.closeFriendStory
);

// story delete
router.delete(
  "/story-delete/:storyId",
  authMiddleware,
  storyController.deleteStory
);

// share delete
router.post("/story-share", authMiddleware, storyController.shareStory);

router.get(
  "/fetch-follower-profile/:id",
  authMiddleware,
  authController.fetchFollowerProfile
);

//story views
router.post("/view-story/:storyId", authMiddleware, storyController.viewStory);

//get story viewers
router.get(
  "/story-viewers/:storyId",
  authMiddleware,
  storyController.getStoryViewers
);

// add highlights
router.post(
  "/add-highlight",
  authMiddleware,
  uploadStoryMedia.single("coverImage"),
  highlightController.addToHighlight
);
//get highlights
router.get("/get-highlight", authMiddleware, highlightController.gethighlight);

//get highlight stories
router.get(
  "/get-highlight-stories/:highlightId",
  authMiddleware,
  highlightController.gethighilightStories
);

//edit highlight
router.put(
  "/update-highlight",
  authMiddleware,
  uploadStoryMedia.single("coverImage"),
  highlightController.edithighlight
);

//delete highlight
router.delete(
  "/delete-highlight",
  authMiddleware,
  highlightController.deleteHighlight
);

module.exports = router;
