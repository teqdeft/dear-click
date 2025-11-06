const { success, error } = require("../../../helpers/response");
const dayjs = require("dayjs");
const db = require("../../../db/db");

function getCurrentWeekRange() {
  const today = dayjs();
  const weekStart = today.startOf("week").add(1, "day");
  const weekEnd = weekStart.add(5, "day").endOf("day");
  return {
    weekStart: weekStart.format("YYYY-MM-DD"),
    weekEnd: weekEnd.format("YYYY-MM-DD"),
  };
}

const selectWeeklyWinners = async (req, res) => {
  const trx = await db.transaction();
  try {
    const { weekStart, weekEnd } = getCurrentWeekRange();

    // Step 1: Get the top post per user for this week
    const topPostsPerUser = await trx("battles as b")
      .leftJoin("posts as p", "b.postId", "p.id")
      .leftJoin("users as u", "b.userId", "u.id")
      .whereBetween("b.created_at", [weekStart, weekEnd])
      .select(
        "b.id as battleId",
        "b.userId",
        "b.postId",
        "p.like_count",
        "u.userName"
      )
      
      .orderBy("b.userId", "asc")
      .orderBy("p.like_count", "desc");

    // Step 2: Pick only the top post per unique user
    const uniqueUserPosts = [];
    const seenUsers = new Set();

    for (const post of topPostsPerUser) {
      if (!seenUsers.has(post.userId)) {
        uniqueUserPosts.push(post);
        seenUsers.add(post.userId);
      }
    }

    // Step 3: Take only top 3 unique users by like count
    const weeklyBattles = uniqueUserPosts
      .sort((a, b) => b.like_count - a.like_count)
      .slice(0, 3);

    if (weeklyBattles.length === 0) {
      await trx.rollback();
      return error(res, "No battle entries found for this week", null, 404);
    }

    // Step 4: Insert into winners table
    const winnersData = weeklyBattles.map((entry) => ({
      battleId: entry.battleId,
      postId: entry.postId,
      userId: entry.userId,
      like_count: entry.like_count,
      week_start: weekStart,
      week_end: weekEnd,
      created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    }));

    await trx("winners").insert(winnersData);

    // Step 5: Mark those posts as winners
    const winnerPostIds = winnersData.map((w) => w.postId);
    await trx("battles")
      .whereIn("postId", winnerPostIds)
      .update({ isWinner: true });

    await trx.commit();

    // Step 6: Send response
    return success(
      res,
      {
        totalWinners: weeklyBattles.length,
        week: { start: weekStart, end: weekEnd },
        executedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        winners: weeklyBattles.map((w, index) => ({
          rank: index + 1,
          userId: w.userId,
          postId: w.postId,
          like_count: w.like_count,
          userName: w.userName,
          weekStart,
          weekEnd,
        })),
      },
      200,
      "Weekly winners selected successfully"
    );
  } catch (err) {
    await trx.rollback();
    return error(
      res,
      "Failed to select weekly winners",
      err.sqlMessage || err.message,
      500
    );
  }
};
const getMostLikedBattlePost = async (req, res) => {
  try {
    const post = await db("battles as b")
      .join("posts as p", "b.postId", "p.id")
      .join("users as u", "b.userId", "u.id")
      .select(
        "b.id as battleId",
        "b.userId",
        "u.userName",
        "u.profile_pic",
        "p.caption",
        "p.media_url",
        "p.like_count",
        "p.created_at"
      )
      .orderBy("p.like_count", "desc")
      .first();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No battle posts found",
      });
    }

    return res.json({
      success: true,
      message: "Most liked battle fetched successfully",
      data: { post },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch most liked battle post",
    });
  }
};

const getUserBattleHistory = async (req, res) => {
  try {
    const userId = Number(req.params.userId || req.user?.id);
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    console.log("Fetching battles for userId:", userId);

    // --- Live Battles ---
    const liveBattles = await db("battles as b")
      .leftJoin("posts as p", "b.postId", "p.id")
      .leftJoin("interests as i", "b.interestId", "i.id")
      .leftJoin("winners as w", "b.id", "w.battleId")
      .select(
        "b.id as battleId",
        "b.userId",
        "p.id as postId",
        "p.caption",
        "p.media_url",
        "p.created_at as post_created",
        "p.like_count",
        "b.isWinner",
        "i.name as interestName"
      )
      .where("b.userId", userId)
      .whereNull("w.id") // Not yet in winners => live
      .orderBy("p.created_at", "desc");

    // --- History Battles (Completed) ---
    const historyBattles = await db("winners as w")
      .leftJoin("battles as b", "w.battleId", "b.id")
      .leftJoin("posts as p", "w.postId", "p.id")
      .leftJoin("interests as i", "b.interestId", "i.id")
      .select(
        "w.id as winnerId",
        "b.id as battleId",
        "b.userId",
        "p.id as postId",
        "p.caption",
        "p.media_url",
        "p.like_count",
        "i.name as interestName",
        "w.week_start",
        "w.week_end"
      )
      .where("b.userId", userId)
      .orderBy("w.created_at", "desc");

    // Combine both
    return res.json({
      success: true,
      totalBattles: liveBattles.length + historyBattles.length,
      liveBattles,
      historyBattles,
    });

    // return res.json({
    //   success: true,
    //   totalBattles: allBattles.length,
    //   battles: allBattles,
    // });
  } catch (error) {
    console.error("Error fetching battle history:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user battle history",
    });
  }
};

module.exports = {
  selectWeeklyWinners,
  getMostLikedBattlePost,
  getUserBattleHistory,
};
