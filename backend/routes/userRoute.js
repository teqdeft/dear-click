const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const followsController = require("../controllers/follows/follows");
const interestController = require("../controllers/interest/interest");
const storyController = require("../controllers/stories/storyController");
const { uploadStoryMedia } = require("../middlewares/imageUploadMiddleware");
const authController = require("../controllers/auth/userController");
const searchController = require("../controllers/search/search");

// search routes
router.get("/search", authMiddleware, searchController.searchUsers);

// follow routes
// Follow / Unfollow / Request / Cancel
router.post("/:userId/follows", authMiddleware, followsController.toggleFollow);
// Accept / Reject a follow request
router.post(
  "/respond/:requestId",
  authMiddleware,
  followsController.respondToFollowRequest
);
router.post(
  "/follow/:userId",
  authMiddleware,
  followsController.followController
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

// user hide for stories
router.post("/hide-story/:storyId", authMiddleware, storyController.storyHide);

// user close friend list for stories
router.post(
  "/close-friend-story/:storyId",
  authMiddleware,
  storyController.closeFriendStory
);

// story delete
router.post(
  "/story-delete/:storyId",
  authMiddleware,
  storyController.deleteStory
);

// get stories
router.get("/get-my-stories", authMiddleware, storyController.getMyStories);
router.get(
  "/get-following-stories",
  authMiddleware,
  storyController.getFollowingStories
);
router.get(
  "/fetch-follower-profile/:id",
  authMiddleware,
  authController.fetchFollowerProfile
);

// search users
router.get("/search", searchController.searchUsers);
router.get("/show-search-all-posts", searchController.fetchPostsForSearch);
router.get(
  "/get-user-details/:id",
  authMiddleware,
  searchController.GetUserDeatilsById
);
router.get(
  "/fetch-User-profile",
  authMiddleware,
  authController.fetchUserProfile
);

module.exports = router;
