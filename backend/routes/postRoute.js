const express = require("express");
const router = express.Router();
const postController = require("../controllers/post/postController");
const { uploadPostMedia } = require("../middlewares/imageUploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { toggleLike } = require("../controllers/post/likes/likeController");
const commentController = require("../controllers/post/comments/commentController");
const shareController = require("../controllers/post/share/shareController");
const saveController = require("../controllers/post/save/saveController");

// create post
router.post(
  "/create-post",
  authMiddleware,
  uploadPostMedia.single("media"),
  postController.createPost
);

// fetch post
router.get("/fetch-post", authMiddleware, postController.getFeedPosts);
router.get(
  "/get-single-story/:postId",
  authMiddleware,
  postController.getSinglePost
);

// like post
router.post("/:postId/toggle-like", authMiddleware, toggleLike);
router.post(
  "/:postId/create-comment",
  authMiddleware,
  commentController.createComment
);
router.get(
  "/:postId/get-comment",
  authMiddleware,
  commentController.getComments
);
router.delete(
  "/:commentId/delete-comment",
  authMiddleware,
  commentController.deleteComment
);

// share post
router.post("/share-post", authMiddleware, shareController.sharePost);

// save post
router.post("/save-post", authMiddleware, saveController.savePost);

// user post interest
router.post(
  "/user-post-interest",
  authMiddleware,
  postController.userPostInterest
);

module.exports = router;
