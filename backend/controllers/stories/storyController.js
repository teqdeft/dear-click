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

const storyHide = async (req, res) => {
  try {
    const { user_hide_id } = req.body;
    const userId = req.user.id; // current logged-in user id (from auth middleware)

    // validation: check if user_hide_id is provided
    if (!user_hide_id) {
      return error(
        res,
        "user_hide_id is required!",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    // check if all given user_hide_id exist in users table
    const usersExist = await db("users")
      .whereIn("id", user_hide_id)
      .pluck("id");

    if (usersExist.length !== user_hide_id.length) {
      return error(res, "Some user_hide_id are invalid", null, 400);
    }

    // check if all given users are actually followed by the logged-in user
    const existFollows = await db("follows")
      .where({ followerId: userId })
      .whereIn("followingId", user_hide_id);

    if (existFollows.length !== user_hide_id.length) {
      return error(res, "Some users are not your followers", null, 400);
    }

    // fetch already hidden users for this user
    const existingHidden = await db("stories_hides")
      .where({ userId })
      .pluck("hiddenUserId");

    // determine new users to add to hide list
    const toAdd = user_hide_id.filter((id) => !existingHidden.includes(id));

    // determine users to remove from hide list
    const toRemove = existingHidden.filter((id) => !user_hide_id.includes(id));

    // insert new hidden users
    if (toAdd.length > 0) {
      const rows = toAdd.map((hiddenId) => ({
        userId,
        hiddenUserId: hiddenId,
      }));
      await db("stories_hides").insert(rows);
    }

    // remove users that are no longer in hide list
    if (toRemove.length > 0) {
      await db("stories_hides")
        .where({ userId })
        .whereIn("hiddenUserId", toRemove)
        .del();
    }

    return success(res, null, 200, "Story hide list updated successfully");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

const closeFriendStory = async (req, res) => {
  try {
    const { close_friends_id } = req.body;
    const storyId = Number(req.params.storyId); // story ID from request params
    const userId = req.user.id; // current logged-in user id (from auth middleware)

    // validation: close_friends_id is required
    if (!close_friends_id) {
      return error(
        res,
        "close_friends_id is required!",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    // validation: storyId is required
    if (!storyId) {
      return error(res, "storyId is required!", null, 400, "INVALID_INPUT");
    }

    // check if provided close_friends_id exist in users table
    const usersExist = await db("users")
      .whereIn("id", close_friends_id)
      .pluck("id");

    if (usersExist.length !== close_friends_id.length) {
      return error(res, "Some close_friends_id are invalid", null, 400);
    }

    // check: verify if all close_friends_id are actually followers of current user
    const existFollows = await db("follows")
      .where({ followerId: userId })
      .whereIn("followingId", close_friends_id);

    if (existFollows.length !== close_friends_id.length) {
      return error(res, "Some users are not your followers", null, 400);
    }

    // fetch already existing close friends for this user
    const existingHidden = await db("close_friend_stories")
      .where({ userId })
      .pluck("closeFriendId");

    // determine new close friends to add
    const toAdd = close_friends_id.filter((id) => !existingHidden.includes(id));

    // determine close friends to remove
    const toRemove = existingHidden.filter(
      (id) => !close_friends_id.includes(id)
    );

    // insert new close friends
    if (toAdd.length > 0) {
      const rows = toAdd.map((closeFriendId) => ({
        userId,
        storyId,
        closeFriendId,
      }));
      await db("close_friend_stories").insert(rows);
    }

    // remove users that are no longer in close friends list
    if (toRemove.length > 0) {
      await db("close_friend_stories")
        .where({ userId, storyId })
        .whereIn("closeFriendId", toRemove)
        .del();
    }

    return success(res, null, 200, "Close Friend list updated successfully");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

const deleteStory = async (req, res) => {
  try {
    // Convert storyId from request parameters to a number
    const storyId = Number(req.params.storyId);
    const userId = req.user.id; // current logged-in user id (from auth middleware)

    // Validate: storyId must be provided
    if (!storyId) {
      return error(res, "storyId is required!", null, 400, "INVALID_INPUT");
    }

    // Check if the story exists for this user
    const existStory = await db("stories")
      .where({ id: storyId, userId })
      .first();

    // If story not found or doesn’t belong to this user
    if (!existStory) {
      return error(res, "Story Is Not Found!", null, 400);
    }

    // Soft delete the story (set status = 1 instead of removing from DB)
    await db("stories").where({ id: storyId }).update({
      status: 1,
    });

    return success(res, null, 200, "Story Deleted successfully");
  } catch (error) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

const shareStory = async (req, res) => {
  try {
    // Extract receiverId and storyId from request body
    const { receiverId, storyId } = req.body;

    const senderId = req.user?.id; // current logged-in user id (from auth middleware)

    // Validate required fields
    if (!storyId || !receiverId) {
      return error(res, "Something went wrong!", null, 400, "MISSING_FIELDS");
    }

    // Prevent users from sharing a story with themselves
    if (receiverId === senderId) {
      return error(
        res,
        "You cannot share a story with yourself",
        null,
        400,
        "INVALID_RECEIVER"
      );
    }

    // Check if post exists
    const story = await db("stories").where({ id: storyId }).first();
    if (!story) {
      return error(res, "story not found", null, 404, "STORY_NOT_FOUND");
    }

    // Check if receiver exists
    const receiver = await db("users").where({ id: receiverId }).first();
    if (!receiver) {
      return error(res, "Receiver not found", null, 404, "USER_NOT_FOUND");
    }

    // Insert share record
    const [id] = await db("stories_shares").insert({
      storyId,
      senderId,
      receiverId,
    });

    return success(res, null, 201, "Story shared!");
  } catch (err) {
    return error(
      res,
      "Failed to share story",
      err.message,
      500,
      "SHARE_FAILED"
    );
  }
};

const getMyStories = async (req, res) => {
  try {
    const now = new Date();
    const userId = req.user.id;

    const myStories = await db("stories")
      .join("users", "stories.userId", "users.id")
      .select("stories.*", "users.name", "users.username", "users.profile_pic")
      .where("stories.userId", userId)
      .andWhere("stories.status", 0)
      .andWhere("stories.expiry_at", ">", now)
      .orderBy("stories.created_at", "desc");

    return success(res, myStories, 200, "My stories fetched");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

const getFollowingStories = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // Find who the user follows
    const followingIds = await db("follows")
      .where({ followerId: userId })
      .pluck("followingId");

    if (followingIds.length === 0) {
      return success(res, [], 200, "No following stories found");
    }

    const stories = await db("stories")
      .join("users", "stories.userId", "users.id")
      .select("stories.*", "users.name", "users.username", "users.profile_pic")
      .whereIn("stories.userId", followingIds)
      .andWhere("stories.status", 1)
      .andWhere("stories.expiry_at", ">", now)
      .orderBy("stories.created_at", "desc");

    return success(res, stories, 200, "Following stories fetched");
  } catch (err) {
    return error(res, "Something went wrong", err.message, 500);
  }
};

const getarchivedStories = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const getStories = await db("stories as s")
      .join("users as u ", "s.userId", "u.id")
      .where("s.userId", userId)
      .andWhere("s.expiry_at", "<", now)
      .andWhere("s.is_archived", 1)
      .select(
        "s.id",
        "s.media_url",
        "s.type",
        "s.caption",
        "s.status",
        "s.is_close_friends",
        "s.created_at",
        "u.profile_pic"
      );
    if (!getStories) {
      return error(res, "Stories not found", null, 404, "STORY_NOT_FOUND");
    }
    return success(res, getStories, 201, "get archive stories successfully!!!");
  } catch {
    return error(res, "Failed to get archive stories", err.message, 500);
  }
};

module.exports = {
  uploadStory,
  storyHide,
  closeFriendStory,
  deleteStory,
  shareStory,
  getMyStories,
  getFollowingStories,
  getarchivedStories,
};
