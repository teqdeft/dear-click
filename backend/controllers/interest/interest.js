const { success, error } = require("../../helpers/response");
const db = require("../../db/db");

// fetch all the interests
const getInterests = async (req, res) => {
  try {
    const interests = await db("interests").select("id", "name");
    if (!interests || interests.length === 0) {
      return success(res, [], 200, "No interests found");
    }

    return success(res, { interests }, 200, "interest fetched successfully");
  } catch (err) {
    return error(res, "Failed to fetch interest", err.message, 400);
  }
};

// post all the interests selected by user
const createUserInterests = async (req, res) => {
  try {
    const { interestIds } = req.body;
    const userId = req.user.id;
    // Validate input
    if (!userId || !Array.isArray(interestIds)) {
      return error(res, "userId and interestIds[] are required", null, 400);
    }

    if (interestIds.length < 3) {
      return error(res, "User must have at least 3 interests", null, 400);
    }

    // Ensure all interest IDs are valid
    const validInterests = await db("interests")
      .whereIn("id", interestIds)
      .pluck("id");

    if (validInterests.length !== interestIds.length) {
      return error(res, "Some interestIds are invalid", null, 400);
    }

    // Start transaction to ensure data integrity
    await db.transaction(async (trx) => {
      // Delete old interests
      await trx("user_interests").where({ userId: userId }).del();

      // Insert new ones
      const rows = interestIds.map((interestId) => ({
        userId: userId,
        interestId: interestId,
      }));
      await trx("user_interests").insert(rows);
    });

    return success(res, null, 200, "User interests updated successfully");
  } catch (err) {
    console.error(err);
    return error(res, "Failed to update user interests", err.message, 500);
  }
};

module.exports = { getInterests, createUserInterests };
