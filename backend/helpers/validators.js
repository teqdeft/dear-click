const db = require("../db/db");
const { error, success } = require("../helpers/response");

const validateReel = async (req, res) => {
  try {
    const { caption, location, interestId } = req.body;
    const userId = req.user.id;

    // 1️⃣ Auth
    if (!userId) return error(res, "Unauthorized", null, 401);

    // 2️⃣ Inputs
    if (!location || !req.file?.filename || !interestId)
      return error(res, "Missing inputs", null, 400);

    // // 4️⃣ Battle checks
    // const battle = await db("battles").where({ id: interestId }).first();
    // if (!battle) return error(res, "Battle not found", null, 404);
    // if (battle.status !== "open")
    //   return error(res, "Battle closed for new entries", null, 400);

    // 5️⃣ One post per user per battle
    const existingReel = await db("battles")
      .where({ userId, interestId })
      .first();
    if (existingReel)
      return error(
        res,
        "You already submitted a reel for this battle",
        null,
        400
      );

    // 6️⃣ Insert new reel
    const [insertId] = await db("battles").insert({
      userId,
      interestId,
      caption: caption || null,
      location,
      media_url: req.file.filename,
    });

    const newReel = await db("battles").where({ id: insertId }).first();
    return success(res, newReel, 201, "Battle reel created successfully");
  } catch (err) {
    return error(res, "Failed to create battle reel", err.message, 500);
  }
};

module.exports = { validateReel };
