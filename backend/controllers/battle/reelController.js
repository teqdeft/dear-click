const db = require("../../db/db");
const { success, error } = require("../../helpers/response");

// battle reel post
const createBattle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { interestId, caption, location } = req.body;

    if (!interestId) {
      return error(res, "Interest ID required", null, 400, "INVALID_INPUT");
    }

    const [battleId] = await db("battles").insert({
      userId,
      interestId,
      caption: caption || null,
      location: location || null,
      media_url: req.file?.filename || null,
    });

    return success(
      res,
      {
        battleId,
        userId,
        interestId,
        caption,
        media_url: req.file?.filename || null,
        location,
      },
      201,
      "Battle created successfully"
    );
  } catch (err) {
    console.log(err);
    return error(res, "Something went wrong", err);
  }
};

// Fetch battle post by user
const fetchBattlePosts = async (req, res) => {
  try {
    const results = await db("battles as b")
      .select(
        "b.id",
        "b.userId",
        "users.userName",
        "users.profile_pic",
        "b.caption",
        "b.media_url",
        "b.interestId",
        "interests.name as interestName",
        "b.like_count",
        "b.created_at"
      )
      .leftJoin("users", "b.userId", "users.id")
      .leftJoin("interests", "b.interestId", "interests.id")
      .orderBy("b.created_at", "desc");

    return res.status(200).json({
      success: true,
      message: "Battle posts fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Fetch battles error:", err);
    return error(res, "Something went wrong", err, 500);
  }
};

const getReelByCategory = async (req, res) => {
  try {
    const interestId = Number(req.params.interestId);
    const userId = req.user.id;

    if (!interestId) {
      return error(
        res,
        "Valid interestId is required",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    console.log("Interest ID from params:", interestId);

    const interestExists = await db("interests")
      .where("id", interestId)
      .first();

    if (!interestExists) {
      return error(res, "Interest not found", null, 404, "INTEREST_NOT_FOUND");
    }

    const results = await db("battles as b")
      .select(
        "b.id",
        "b.userId",
        "users.userName",
        "users.profile_pic",
        "b.caption",
        "b.media_url",
        "b.interestId",
        "interests.name as interestName",
        "b.like_count",
        "b.created_at"
      )
      .leftJoin("users", "b.userId", "users.id")
      .leftJoin("interests", "b.interestId", "interests.id")
      .where("b.interestId", interestId)
      .orderBy("b.created_at", "desc");

    return res.status(200).json({
      success: true,
      message: "Battle posts fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Fetch battles error:", err);
    return error(res, "Something went wrong", err, 500);
  }
};

module.exports = { createBattle, fetchBattlePosts, getReelByCategory };
