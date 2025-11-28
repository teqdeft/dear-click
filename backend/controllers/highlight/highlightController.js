const { success, error } = require("../../helpers/response");
const db = require("../../db/db");

const addToHighlight = async (req, res) => {
  try {
    const userId = req.user.id;
    let { highlightId, name, storyIds } = req.body;

    if (typeof storyIds === "string") {
      try {
        storyIds = JSON.parse(storyIds);
      } catch {
        // If user provided a single value like "1"
        storyIds = [storyIds];
      }
    }

    // Ensure storyIds is always an array
    if (!Array.isArray(storyIds)) {
      storyIds = [storyIds];
    }

    // Convert all to integers
    storyIds = storyIds.map((id) => Number(id)).filter((id) => !isNaN(id));

    // storyIds must be an array
    if (!storyIds || storyIds.length === 0) {
      return error(
        res,
        "At least one story must be provided",
        null,
        400,
        "INVALID_INPUT"
      );
    }

    let coverImage = req.file ? req.file.filename : null;
    let createdNew = false;
    // ----------------------------
    // CASE 1: Create a new highlight
    // ----------------------------
    if (!highlightId) {
      // highlight name required only when creating new
      if (!name) {
        return error(
          res,
          "Highlight name is required",
          null,
          400,
          "INVALID_INPUT"
        );
      }

      const [newHighlightId] = await db("highlights").insert({
        user_id: userId,
        name,
        cover_image: coverImage,
        created_at: new Date(),
        updated_at: new Date(),
      });

      highlightId = newHighlightId; // set highlightId for mapping
      createdNew = true;
    }

    // ----------------------------
    // CASE 2: Add stories to existing highlight
    // ----------------------------
    const highlightExists = await db("highlights")
      .where({ id: highlightId, user_id: userId })
      .first();

    if (!highlightExists) {
      return error(res, "Highlight not found", null, 404, "NOT_FOUND");
    }

    // create story mappings
    const mappings = storyIds.map((storyId) => ({
      highlight_id: highlightId,
      story_id: storyId,
      added_at: new Date(),
    }));

    await db("highlight_stories").insert(mappings);

    return success(
      res,
      { highlightId },
      200,
      createdNew
        ? "Highlight created and stories added"
        : "Stories added to existing highlight"
    );
  } catch (err) {
    return error(
      res,
      "Failed to process highlight request",
      err.message,
      500,
      "HIGHLIGHT_PROCESS_FAILED"
    );
  }
};

const gethighlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const highlights = await db("highlights")
      .where({ user_id: userId })
      .where({ status: 0 })
      .orderBy("created_at", "desc");

    return success(res, highlights, 200, "Highlights fetched successfully");
  } catch (err) {
    return error(
      res,
      "Failed to fetch highlights",
      err.message,
      500,
      "HIGHLITE_FETCH_FAILED"
    );
  }
};

const gethighilightStories = async (req, res) => {
  try {
    const { highlightId } = req.params;
    const stories = await db("highlight_stories as hs")
      .join("stories as s", "hs.story_id", "=", "s.id")
      .where("hs.highlight_id", highlightId)
      .where("hs.status", 0)
      .where("s.status", 0)
      .select("s.*")
      .orderBy("s.created_at", "desc");
    return success(res, stories, 200, "Highlight stories fetched successfully");
  } catch (err) {
    return error(
      res,
      "Failed to fetch highlight stories",
      err.message,
      500,
      "HIGHLIGHT_STORIES_FETCH_FAILED"
    );
  }
};

const edithighlight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { highlightId, name, removeStoryIds, addStoryIds } = req.body;
    if (typeof removeStoryIds === "string")
      removeStoryIds = removeStoryIds.split(",");
    if (typeof addStoryIds === "string") addStoryIds = addStoryIds.split(",");
    let coverImage = req.file ? req.file.filename : null;
    if (!highlightId) {
      return error(res, "Highlight Id is required", null, 404, "INVALID_INPUT");
    }
    const highlight = await db("highlights")
      .where({ id: highlightId, user_id: userId })
      .first();
    if (!highlight) {
      return error(res, "Highlight not found", null, 404, "NOT_FOUND");
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (coverImage) updateData.cover_image = coverImage;
    updateData.updated_at = new Date();

    const updated = await db("highlights")
      .where({ id: highlightId, user_id: userId })
      .update(updateData);
    if (!updated) {
      return error(res, "Highlight not found", null, 404, "NOT_FOUND");
    }
    if (
      removeStoryIds &&
      Array.isArray(removeStoryIds) &&
      removeStoryIds.length
    ) {
      await db("highlight_stories")
        .whereIn("story_id", removeStoryIds)
        .andWhere("highlight_id", highlightId)
        .update({ status: 1 });
    }
    if (addStoryIds && Array.isArray(addStoryIds) && addStoryIds.length) {
      const mappings = addStoryIds.map((storyId) => ({
        highlight_id: highlightId,
        story_id: storyId,
        added_at: new Date(),
      }));

      await db("highlight_stories").insert(mappings);
    }
    return success(res, null, 200, "Highlight updated successfully");
  } catch (err) {
    return error(
      res,
      "Failed to update highlight",
      err.message,
      500,
      "HIGHLIGHT_UPDATE_FAILED"
    );
  }
};

const deleteHighlight = async (req, res) => {
  try {
    const { highlightId, storyId } = req.body;
    const userId = req.user.id;

    if (!highlightId) {
      return error(res, "Highlight Id is required", null, 404, "INVALID_INPUT");
    }
    // Check if highlight exists and belongs to user
    const highlight = await db("highlights")
      .where({ id: highlightId, user_id: userId })
      .first();
    if (!highlight) {
      return error(res, "Highlight not found", null, 404, "NOT_FOUND");
    }
    if (storyId) {
      const deleted = await db("highlight_stories")
        .where({ highlight_id: highlightId, story_id: storyId })
        .update({ status: 1 });
      if (!deleted) {
        return error(
          res,
          "Highlight story not found in highlights",
          null,
          404,
          "NOT_FOUND"
        );
      }
      return success(
        res,
        null,
        200,
        "Story removed from highlight successfully"
      );
    }
    await db("highlights").where({ id: highlightId }).update({ status: 1 });

    return success(res, null, 200, "Highlight deleted successfully");
  } catch (err) {
    return error(
      res,
      "Failed to delete highlight",
      err.message,
      500,
      "HIGHLIGHT_DELETE_FAILED"
    );
  }
};

module.exports = {
  addToHighlight,
  gethighlight,
  gethighilightStories,
  edithighlight,
  deleteHighlight,
};
