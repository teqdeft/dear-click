const { success, error } = require("../../helpers/response");
const db = require("../../db/db");

const uploadStory = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { caption } = req.body;

    // validation: must have either caption or file
    if (!req.file && !caption) {
      return error(
        res,
        "Choose image/video or caption",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    // determine file type
    let mediaType = null;
    let mediaUrl = null;

    if (req.file) {
      if (req.file.mimetype.startsWith("image/")) {
        mediaType = "image";
      } else if (req.file.mimetype.startsWith("video/")) {
        mediaType = "video";
      } else {
        mediaType = "other";
      }

      mediaUrl = req.file.filename; // from multer middleware (relative path)
    }

    // expiry time (24 hours from now)
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Insert into DB
    await db("stories").insert({
      userId,
      caption: caption || null,
      media_url: mediaUrl,
      type: mediaType,
      expiry_at: expireAt,
      created_at: new Date(),
    });

    return success(res, null, 201, "Story uploaded successfully");
  } catch (err) {
    console.error(err);
    return error(
      res,
      "Something went wrong while uploading story",
      err.message,
      500,
      "STORY_UPLOAD_FAILED"
    );
  }
};

module.exports = { uploadStory };
