const db = require("../../db/db");
const { success, error } = require("../../helpers/response");

// Create battle post
const createBattle = async (req, res) => {
  try {
    const { caption, location, interestId } = req.body;
    const userId = req.user.id;

    if (!caption && !req.file) {
      return error(
        res,
        "Post must have either caption or media",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    let newBattle = null;

    await db.transaction(async (trx) => {
      const [postId] = await trx("posts").insert({
        userId,
        caption: caption || null,
        location: location || null,
        media_url: req.file ? req.file.filename : null,
      });

      const [battleId] = await trx("battles").insert({
        userId,
        postId,
        interestId,
      });

      newBattle = await trx("battles as b")
        .select(
          "b.id as battleId",
          "b.userId",
          "u.userName",
          "u.profile_pic",
          "p.id as postId",
          "p.caption",
          "p.media_url",
          "p.location",
          "b.interestId",
          "i.name as interestName",
          "p.created_at as postCreatedAt",
          "b.created_at as battleCreatedAt"
        )
        .leftJoin("posts as p", "b.postId", "p.id")
        .leftJoin("users as u", "b.userId", "u.id")
        .leftJoin("interests as i", "b.interestId", "i.id")
        .where("b.id", battleId)
        .first();
    });

    return success(res, newBattle, 201, "Battle post created successfully");
  } catch (err) {
    return error(
      res,
      "Something went wrong while creating battle post",
      err.message,
      500,
      "CREATE_BATTLE_FAILED"
    );
  }
};

// Fetch battle post by user
const fetchBattlePosts = async (req, res) => {
  try {
    const results = await db("battles as b")
      .select(
        "b.id as battleId",
        "b.userId",
        "u.userName",
        "u.profile_pic",
        "p.id as postId",
        "p.caption",
        "p.media_url",
        "p.location",
        "p.created_at as postCreatedAt",
        "b.created_at as battleCreatedAt"
      )
      .leftJoin("posts as p", "b.postId", "p.id")
      .leftJoin("users as u", "b.userId", "u.id")
      .orderBy("b.created_at", "desc");

    return res.status(200).json({
      success: true,
      message: "Battle posts fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Fetch battles error:", err);
    return error(res, "Something went wrong", err.message, 500);
  }
};

// Get reels by category
const getReelByCategory = async (req, res) => {
  try {
    const userId = Number(req.params.interestId); // using same route param name
    if (!userId) {
      return error(res, "Valid userId is required", null, 400, "INVALID_INPUT");
    }

    const userExists = await db("users").where("id", userId).first();
    if (!userExists) {
      return error(res, "User not found", null, 404, "USER_NOT_FOUND");
    }

    const results = await db("battles as b")
      .select(
        "b.id as battleId",
        "b.userId",
        "u.userName",
        "u.profile_pic",
        "p.id as postId",
        "p.caption",
        "p.media_url",
        "p.location",
        "p.like_count",
        "p.comment_count",
        "p.share_count",
        "p.save_count",
        "p.created_at as postCreatedAt",
        "b.created_at as battleCreatedAt"
      )
      .leftJoin("posts as p", "b.postId", "p.id")
      .leftJoin("users as u", "b.userId", "u.id")
      .where("b.userId", userId)
      .orderBy("b.created_at", "desc");

    return success(res, results, 200, "Battle posts fetched successfully");
  } catch (err) {
    console.error("Fetch battles by user error:", err);
    return error(
      res,
      "Something went wrong while fetching battles by user",
      err.message,
      500,
      "FETCH_BATTLES_BY_USER_FAILED"
    );
  }
};

module.exports = {
  createBattle,
  fetchBattlePosts,
  getReelByCategory,
};
