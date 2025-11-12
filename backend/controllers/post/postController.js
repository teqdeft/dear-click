const db = require("../../db/db");
const { success, error } = require("../../helpers/response");

//All core post logic

// create post
const createPost = async (req, res) => {
  try {
    const { caption, location } = req.body;
    const userId = req.user.id;  

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

module.exports = { createPost };
