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

const getStory = async (req, res) => {
  try {
    const userId = req.user.id;

    const stories = await db("stories")
      .where({ userId })
      .where({ status: 0 })
      .orderBy("created_at", "desc");

    const now = new Date();

    const formattedStories = stories.map((story) => ({
      ...story,
      expired: new Date(story.expiry_at) < now,
    }));

    return success(res, formattedStories, 200, "Stories fetched successfully");
  } catch (err) {
    console.error(err);
    return error(
      res,
      "Failed to fetch stories",
      err.message,
      500,
      "STORY_FETCH_FAILED"
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

const canUserViewStory = async (viewerId, ownerId) => {
  if (viewerId === ownerId) {
    return true;
  }

  const user = await db("users").where({ id: ownerId }).first();
  if (!user) return false;

  // Block check
  const blocked = await db("blocked_users")
    .where({ blocker_id: ownerId, blocked_id: viewerId })
    .first();
  if (blocked) return false;

  // Public account → allowed
  if (!user.is_private) return true;

  // Private account → check followers table
  const isFollower = await db("follows")
    .where({
      followerId: viewerId,
      followingId: ownerId,
      status: "accepted",
    })
    .first();

  return !!isFollower;
};

const viewStory = async (req, res) => {
  try {
    const viewerId = req.user.id;
    const ownerId = story.userId;
    const { storyId } = req.params;

    const story = await db("stories").where({ id: storyId }).first();
    if (!story) {
      return error(res, "Story not found", null, 404, "STORY_NOT_FOUND");
    }

    // Permission check (if needed)
    const allowed = await canUserViewStory(viewerId, ownerId);
    if (!allowed) {
      return error(
        res,
        "Not allowed to view this story",
        null,
        403,
        "STORY_VIEW_NOT_ALLOWED"
      );
    }

    // Check duplicate view
    const alreadyViewed = await db("story_views")
      .where({ story_id: storyId, viewer_id: viewerId })
      .first();

    if (!alreadyViewed) {
      await db("story_views").insert({
        story_id: storyId,
        viewer_id: viewerId,
        userId: story.userId, // 👈 REQUIRED BY YOUR MIGRATION
        viewed_at: new Date(),
      });
    }

    return success(res, null, 200, "Story viewed successfully");
  } catch (err) {
    console.error(err);
    return error(
      res,
      "Failed to record story view",
      err.message,
      500,
      "VIEW_STORY_FAILED"
    );
  }
};

const getStoryViewers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storyId } = req.params;

    const story = await db("stories").where({ id: storyId }).first();
    if (!story) {
      return error(res, "Story not found", null, 404, "STORY_NOT_FOUND");
    }

    // Only owner can access viewer list
    if (story.userId !== userId) {
      return error(
        res,
        "You are not allowed to see viewers of this story",
        null,
        403,
        "UNAUTHORIZED_VIEW"
      );
    }

    const viewers = await db("story_views as sv")
      .join("users as u", "u.id", "sv.viewer_id")
      .select("u.id as viewerId", "u.username", "u.profile_pic", "sv.viewed_at")
      .where("sv.story_id", storyId)
      .orderBy("sv.viewed_at", "desc");

    const responseData = {
      storyId,
      totalViewers: viewers,
      viewers,
    };

    return success(res, responseData, 200, "Story viewers fetched");
  } catch (err) {
    console.error(err);
    return error(
      res,
      "Failed to fetch story viewers",
      err.message,
      500,
      "STORY_VIEWERS_FETCH_FAILED"
    );
  }
};

const getStoryCircles = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    // 1️⃣ Get all users who posted unexpired stories (24 hours valid)
    const storyUsers = await db("stories as s")
      .join("users as u", "u.id", "s.userId")
      .where("s.expiry_at", ">", now)
      .select(
        "u.id as userId",
        "u.userName",
        "u.profile_pic",
        "s.userId",
        db.raw("MAX(s.created_at) as latestStoryTime"),
        db.raw("COUNT(s.id) as totalStories")
      )
      .groupBy("s.userId");

    if (!storyUsers.length) {
      return res.json([]);
    }

    // 2️⃣ Get all hidden users (people that current user has hidden)
    const hiddenUsers = await db("stories_hides")
      .where("userId", userId)
      .pluck("hiddenUserId");

    // 3️⃣ Get close friends of current user
    const closeFriends = await db("close_friends")
      .where("userId", userId)
      .pluck("closeFriendId");

    // 4️⃣ Logged-in user's followings
    const followingList = await db("followers")
      .where("followerId", userId)
      .pluck("followingId");

    // 5️⃣ For each story poster → fetch all their active stories
    const result = [];
   
    for (const user of storyUsers) {
      // Skip if current user has hidden this user's story
      if (hiddenUsers.includes(user.userId)) continue;

      // 4.1 Fetch user stories
      const stories = await db("stories")
        .where("userId", user.userId)
        .andWhere("expiry_at", ">", now)
        .select("id", "media_url", "type", "created_at");

      if (!stories.length) continue;

      // 4.2 Check unseen/seen for circle color
      const storyIds = stories.map((s) => s.id);

      const seenStories = await db("story_status")
        .whereIn("storyId", storyIds)
        .andWhere("userId", userId)
        .andWhere("seen", true)
        .pluck("storyId");

      const unseenCount = storyIds.length - seenStories.length;

      // User is close-friend?
      const isCloseFriend = closeFriends.includes(user.userId);

      result.push({
        userId: user.userId,
        name: user.name,
        profile_pic: user.profile_pic,
        totalStories: stories.length,
        unseenCount,
        latestStoryTime: user.latestStoryTime,
        isCloseFriend,
        stories,
      });
    }

    // 5️⃣ Sort story circles exactly like Instagram:
    // - Unseen first
    // - Then based on latest story time
    result.sort((a, b) => {
      if (a.unseenCount > 0 && b.unseenCount === 0) return -1;
      if (b.unseenCount > 0 && a.unseenCount === 0) return 1;
      return new Date(b.latestStoryTime) - new Date(a.latestStoryTime);
    });

    res.json(result);
  } catch (err) {
    console.error("getStoryCircles error:", err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  uploadStory,
  getStory,
  storyHide,
  closeFriendStory,
  deleteStory,
  shareStory,
  viewStory,
  getStoryViewers,
  getStoryCircles,
};
