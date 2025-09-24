const db = require("../../../db/db");
const { error, success } = require("../../../helpers/response");

// like/unlike a post atomically
const toggleLike = async (req, res) => {
  const postId = Number(req.params.postId);
  const userId = req.user?.id;

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
    let action = "liked";
    await db.transaction(async (trx) => {
      // 1) Ensure parent exists (avoids FK error)
      const post = await trx("posts")
        .select("id")
        .where({ id: postId })
        .first();
      if (!post) {
        throw new Error("POST_NOT_FOUND");
      }

      // 2) Check if already liked
      const existing = await trx("likes").where({ postId, userId }).first();

      if (existing) {
        await trx("likes").where({ postId, userId }).del();
        await trx("posts")
          .where({ id: postId })
          .update({ like_count: trx.raw("GREATEST(like_count - 1, 0)") });
        action = "unliked";
      } else {
        await trx("likes").insert({ postId, userId });
        await trx("posts")
          .where({ id: postId })
          .update({ like_count: trx.raw("like_count + 1") });
      }
    });

    return success(res, { action }, 200, `Post successfully ${action}`);
  } catch (err) {
    if (err.message === "POST_NOT_FOUND") {
      return error(res, "Post not found", null, 404);
    }
    return error(res, "something went wrong!", err.message, 500);
  }
};

module.exports = { toggleLike };
