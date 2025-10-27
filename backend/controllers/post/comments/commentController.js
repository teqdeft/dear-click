const db = require("../../../db/db");
const { error, success } = require("../../../helpers/response");

// core comment controller
const createComment = async (req, res) => {
  const { comment } = req.body;
  const postId = Number(req.params.postId);
  const userId = req.user?.id;

  if (!comment || !comment.trim()) {
    return error(
      res,
      "Comment cannot be empty",
      "Comment text is required",
      400,
      "EMPTY_COMMENT"
    );
  }

  if (!Number.isInteger(postId) || postId <= 0) {
    return error(
      res,
      "Invalid postId",
      "postId must be a positive integer",
      400,
      "INVALID_POST_ID"
    );
  }

  if (!userId) {
    return error(
      res,
      "Unauthorized",
      "Missing user id on request",
      401,
      "UNAUTHORIZED"
    );
  }

  try {
    let newComment;

    await db.transaction(async (trx) => {
      // 1) Ensure post exists
      const post = await trx("posts")
        .select("id")
        .where({ id: postId })
        .first();
      if (!post) {
        throw new Error("POST_NOT_FOUND");
      }

      // 2) Insert comment
      const [id] = await trx("comments").insert({ postId, userId, comment });

      // 3) Increment comment_count in posts
      await trx("posts")
        .where({ id: postId })
        .update({ comment_count: trx.raw("comment_count + 1") });

      // 4) Fetch the newly created comment with user info
      newComment = await trx("comments")
        .select("comments.*", "user.username", "user.profile_pic")
        .leftJoin("user", "comments.userId", "user.id")
        .where("comments.id", id)
        .first();
    });

    if (!newComment) {
      return error(res, "Post not found", null, 404, "POST_NOT_FOUND");
    }

    return success(res, newComment, 201, "Comment added successfully");
  } catch (err) {
    if (err.message === "POST_NOT_FOUND") {
      return error(res, "Post not found", null, 404, "POST_NOT_FOUND");
    }
    return error(
      res,
      "Failed to add comment",
      err.message,
      500,
      "ADD_COMMENT_FAILED"
    );
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?.id;

  if (!Number.isInteger(Number(commentId)) || Number(commentId) <= 0) {
    return error(
      res,
      "Invalid commentId",
      "commentId must be a positive integer",
      400,
      "INVALID_COMMENT_ID"
    );
  }

  if (!userId) {
    return error(
      res,
      "Unauthorized",
      "Missing user id on request",
      401,
      "UNAUTHORIZED"
    );
  }

  try {
    let deletedComment;

    await db.transaction(async (trx) => {
      // 1) Find the comment
      const comment = await trx("comments").where({ id: commentId }).first();

      if (!comment) {
        throw new Error("COMMENT_NOT_FOUND");
      }

      // Optional: check ownership (only author can delete)
      if (comment.userId !== userId) {
        throw new Error("FORBIDDEN");
      }

      // 2) Delete the comment
      await trx("comments").where({ id: commentId }).del();

      // 3) Decrement comment_count on the post
      await trx("posts")
        .where({ id: comment.postId })
        .update({ comment_count: trx.raw("GREATEST(comment_count - 1, 0)") });

      deletedComment = comment;
    });

    return success(res, deletedComment, 200, "Comment deleted successfully");
  } catch (err) {
    if (err.message === "COMMENT_NOT_FOUND") {
      return error(res, "Comment not found", null, 404, "COMMENT_NOT_FOUND");
    }
    if (err.message === "FORBIDDEN") {
      return error(
        res,
        "Forbidden",
        "Not allowed to delete this comment",
        403,
        "FORBIDDEN"
      );
    }
    return error(
      res,
      "Failed to delete comment",
      err.message,
      500,
      "DELETE_COMMENT_FAILED"
    );
  }
};

module.exports = { createComment, deleteComment };
