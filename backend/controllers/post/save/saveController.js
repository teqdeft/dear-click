const db = require("../../../db/db");
const { error, success } = require("../../../helpers/response");

// save and unsave post, toggle in one controller
const savePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user?.id;

    // Validate inputs
    if (!Number.isInteger(postId) || postId <= 0) {
      return error(
        res,
        "Invalid post",
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

    // Ensure post exists
    const existPost = await db("posts").where({ id: postId }).first();
    if (!existPost) {
      return error(res, "Post not found", null, 404, "POST_NOT_FOUND");
    }

    // Check if already saved
    const existSavePost = await db("saves").where({ postId, userId }).first();

    let action;
    await db.transaction(async (trx) => {
      if (existSavePost) {
        // Unsave
        await trx("saves").where({ postId, userId }).del();
        await trx("posts")
          .where({ id: postId })
          .update({ save_count: trx.raw("GREATEST(save_count - 1, 0)") });
        action = "UnSaved";
      } else {
        // Save
        await trx("saves").insert({ postId, userId });
        await trx("posts")
          .where({ id: postId })
          .update({ save_count: trx.raw("save_count + 1") });
        action = "Saved";
      }
    });

    return success(res, { postId, action }, 201, `${action}!`);
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

module.exports = { savePost };
