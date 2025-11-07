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

// fetch users posts just for testing
const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    // Step 1: Get the latest post for each user
    const latestPosts = await db('posts as p1')
      .join('users', 'users.id', 'p1.userId')
      .select(
        'p1.id',
        'p1.media_url',
        'p1.caption',
        'p1.like_count',
        'p1.comment_count',
        'p1.share_count',
        'p1.created_at',
        'users.id as userId',
        'users.name',
        'users.username',
        'users.profile_pic'
      )
      .whereRaw(`
        p1.created_at = (
          SELECT MAX(p2.created_at)
          FROM posts p2
          WHERE p2.userId = p1.userId
        )
      `);

    // Step 2: Shuffle the posts randomly
    const shuffledPosts = latestPosts.sort(() => Math.random() - 0.5);
    console.log("shuffledPosts", shuffledPosts)
    return success(res, shuffledPosts, 200, "Feed fetched successfully");
  } catch (err) {
    console.error('Error fetching feed:', err);
    return error(
      res,
      "Something went wrong",
      err.message,
      500,
      "Failed to fetch feed"
    );
  }
};

module.exports = { createPost, getFeedPosts };
