const db = require("../../db/db");
const { success, error } = require("../../helpers/response");

//All core post logic

// create post
const createPost = async (req, res) => {
  try {
    const { caption, location } = req.body;
    const userId = req.user.id; // assuming auth middleware sets req.user

    // validation
    if (!caption && !req.filePath) {
      return error(
        res,
        "Post must have either caption or media",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    // Insert into DB
    await db("posts").insert({
      userId: userId,
      caption: caption || null,
      location: location || null,
      media_url: req.file.filename || null,
    });

    return success(res, null, 201, "Post created successfully");
  } catch (err) {
    return error(
      res,
      "Something went wrong while creating post",
      err.message,
      500,
      "CREATE_POST_FAILED"
    );
  }
};

const userPostInterest = async (req, res) => {
  try {
    const { postId, action } = req.body
    const userId = req.user.id; // current logged-in user id (from auth middleware)

    // validation: both postId and action are required
    if (!postId || !action) {
      return error(res, "postId and action both is required!")
    }

    // check if the given post exists in DB
    const existPost = await db('posts').where({ id: postId }).first()

    if (!existPost) {
      return error(res, "Post Is Not Found!")
    };

    // check if user already has an entry for this post
    const existInterest = await db("user_post_interests").where({ postId, userId }).first()

    // if no entry exists, insert new
    if (!existInterest) {
      await db("user_post_interests").insert({
        userId,
        postId,
        status: action
      });
    }

    // if entry exists, update instead of inserting duplicate
    else {
      await db("user_post_interests").where({ id: existInterest.id }).update({
        userId,
        postId,
        status: action
      });
    }

    // set custom message based on user action
    let message = action == "interested" ? "Thanks, we’ll show you more content like this." : "We’ll show you fewer posts like this.";

    return success(res, "", 200, message)
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
}

module.exports = { createPost, userPostInterest };
