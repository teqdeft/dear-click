const db = require("../../db/db");
const { success, error } = require("../../helpers/response");
const { generateVideoThumbnail } = require("../../helpers/userPost");
let path = require("path");

//All core post logic

// create post
const createPost = async (req, res) => {
  try {
    const { caption, location } = req.body;
    const userId = req.user.id; // assuming auth middleware sets req.user

    const mediaPath = path.join(process.cwd(), "public", req.filePath);
    let thumbnailPath = null;

    // Generate thumbnail if it's a video
    if (req.file.mimetype.startsWith("video/")) {
      thumbnailPath = await generateVideoThumbnail(mediaPath, "posts");
    }

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
      thumbnail_url: thumbnailPath || null,
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
    const { postId, action } = req.body;
    const userId = req.user.id; // current logged-in user id (from auth middleware)

    // validation: both postId and action are required
    if (!postId || !action) {
      return error(res, "postId and action both is required!");
    }

    // check if the given post exists in DB
    const existPost = await db("posts").where({ id: postId }).first();

    if (!existPost) {
      return error(res, "Post Is Not Found!");
    }

    // check if user already has an entry for this post
    const existInterest = await db("user_post_interests")
      .where({ postId, userId })
      .first();

    // if no entry exists, insert new
    if (!existInterest) {
      await db("user_post_interests").insert({
        userId,
        postId,
        status: action,
      });
    }

    // if entry exists, update instead of inserting duplicate
    else {
      await db("user_post_interests").where({ id: existInterest.id }).update({
        userId,
        postId,
        status: action,
      });
    }

    // set custom message based on user action
    let message =
      action == "interested"
        ? "Thanks, we’ll show you more content like this."
        : "We’ll show you fewer posts like this.";

    return success(res, "", 200, message);
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

// fetch users posts just for testing
const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    // Step 1: Get the latest post for each user
    // const latestPosts = await db('posts as p1')
    //   .join('users', 'users.id', 'p1.userId')
    //   .select(
    //     'p1.id',
    //     'p1.media_url',
    //     'p1.caption',
    //     'p1.like_count',
    //     'p1.comment_count',
    //     'p1.share_count',
    //     'p1.created_at',
    //     'users.id as userId',
    //     'users.name',
    //     'users.username',
    //     'users.profile_pic'
    //   )
    //   .whereRaw(`
    //     p1.created_at = (
    //       SELECT MAX(p2.created_at)
    //       FROM posts p2
    //       WHERE p2.userId = p1.userId
    //     )
    //   `);

    // Step 2: Shuffle the posts randomly
    // const shuffledPosts = latestPosts.sort(() => Math.random() - 0.5);
    // console.log("shuffledPosts", shuffledPosts)

    const latestPosts = await db("posts")
      .select(
        "posts.*",
        "users.id as user_id",
        "users.name as user_name",
        "users.userName as user_username",
        "users.email as user_email",
        "users.profile_pic as user_profile_pic"
      )
      .leftJoin("users", "posts.userId", "users.id")
      .orderByRaw("RAND()");

    return success(res, latestPosts, 200, "Feed fetched successfully");
  } catch (err) {
    console.error("Error fetching feed:", err);
    return error(
      res,
      "Something went wrong",
      err.message,
      500,
      "Failed to fetch feed"
    );
  }
};

module.exports = { createPost, getFeedPosts, userPostInterest };
