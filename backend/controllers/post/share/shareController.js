const db = require("../../../db/db");
const { error, success } = require("../../../helpers/response");

const sharePost = async (req, res) => {
  try {
    const { receiverId, postId } = req.body;
    const senderId = req.user?.id;

    if (!postId || !receiverId) {
      return error(res, "Something went wrong!", null, 400, "MISSING_FIELDS");
    }

    if (receiverId === senderId) {
      return error(
        res,
        "You cannot share a post with yourself",
        null,
        400,
        "INVALID_RECEIVER"
      );
    }

    // Check if post exists
    const post = await db("posts").where({ id: postId }).first();
    if (!post) {
      return error(res, "Post not found", null, 404, "POST_NOT_FOUND");
    }

    // Check if receiver exists
    const receiver = await db("user").where({ id: receiverId }).first();
    if (!receiver) {
      return error(res, "Receiver not found", null, 404, "user_NOT_FOUND");
    }

    // Insert share record
    const [id] = await db("post_shares").insert({
      postId,
      senderId,
      receiverId,
    });

    //  Increment share_count on post
    await db("posts")
      .where({ id: postId })
      .update({
        share_count: db.raw("share_count + 1"),
      });

    const newShare = await db("post_shares").where({ id }).first();

    return success(res, null, 201, "Post shared!");
  } catch (err) {
    return error(res, "Failed to share post", err.message, 500, "SHARE_FAILED");
  }
};

module.exports = { sharePost };
